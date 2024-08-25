module.exports = function myBabelPlugin() {
  return {
    visitor: {
      VariableDeclaration(path) {
        console.log('VariableDeclaration() kind', path.node.kind);

        //const를 var로 변환하는 조건문
        if (path.node.kind === 'const') {
          path.node.kind = 'var'
        }
      }
    },
  };
}