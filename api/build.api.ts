import ts from 'typescript';
import { cp, rm } from 'fs/promises';
import { basename, join } from 'path';

const compile = async (tsConfigFile: string, rootFiles: string[], staticFiles: string[]): Promise<void> => {
  const { error, config } = ts.readConfigFile(tsConfigFile, ts.sys.readFile);

  if (error) {
    console.error('Error parsing tsConfig:');
    console.error(error);
    return;
  }

  await rm(config.compilerOptions.outDir, { recursive: true, force: true });

  const program = ts.createProgram(rootFiles, { ...config.compilerOptions });
  const emitResult = program.emit();

  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });

  if (emitResult.emitSkipped) {
    console.error('Error Compiling files');
    return;
  }
  console.log('Compiled Successfully');

  console.log(`Copying static files: `, staticFiles.join(','));
  await Promise.all(
    staticFiles.map(dir => cp(dir, join(config.compilerOptions.outDir, basename(dir)), { recursive: true })),
  );
  console.log('Static files copied');
};

compile('tsconfig.api.json', ['index.ts'], ['templates', 'package.json']).catch(e => {
  console.error(e);
  process.exit(1);
});
