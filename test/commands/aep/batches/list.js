const {expect, test} = require('@oclif/test')

describe('list batches test', () => {
  test
    .stdout()
    .command(['aio aep:batches:ls -j'])
    .it('runs hello', ctx => {
      !expect(ctx.stdout).to.empty//('hello world')
    })

  test
    .stdout()
    .command(['aio aep:batches:ls'])
    .it('runs hello --name jeff', ctx => {
      !expect(ctx.stdout).to.contain('hello jeff')
    })
})
