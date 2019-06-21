workflow "Main" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "docker://node:10"
  runs = "yarn"
}

action "Test" {
  uses = "docker://node:10"
  needs = ["Install"]
  runs = "yarn test"
}
