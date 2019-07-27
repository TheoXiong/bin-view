/**
 * @function get commands and params from command line input.
 * @example node test.js -n 123 hello world  ==> { params: ['hello','world'], cmds: {'-n': '123'}}
 * @param {Array} argv process.argv
 * @param {Array} cmdList specify the command. such as '-n'
 * @return {Object} the result object include params and cmds
 */
const parseArgv = (argv, cmdList) => {
  if (!(argv && argv.length >= 3)) return null

  let args = argv.slice(2)
  if (!(Array.isArray(cmdList) && cmdList.length > 0)) return { params: args }

  let params = []
  let cmds = {}
  args.forEach((item, index) => {
    if (cmdList.includes(item) && index < (args.length - 1) && !cmdList.includes(args[index + 1])) {
      cmds[item] = args[index + 1]
    } else if (!cmdList.includes(item) && !cmdList.includes(args[index - 1])) {
      params.push(item)
    }
  })

  return { params, cmds }
}

module.exports = {
  parseArgv
}
