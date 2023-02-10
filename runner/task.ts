process.on('unhandledRejection', (r) => {
  console.log('Unhandled Promise Rejection', r)
  process.exit(1)
})

async function main() {
  const { taskMap } = require('./taskMap')
  const [, , taskName, ...rest] = process.argv

  const taskLoader = taskMap[taskName]

  if (!taskLoader) {
    console.error(`Unknown task: ${taskName}`)
    process.exit(1)
  }

  const task = taskLoader()

  await task(...rest)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.log('runner error', err)
    process.exit(1)
  })
