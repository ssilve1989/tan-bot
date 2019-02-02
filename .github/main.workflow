workflow "Main" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "docker://node:latest"
  runs = "yarn"
}

action "Test" {
  uses = "docker://node:latest"
  needs = ["Install"]
  runs = "yarn test"
}
