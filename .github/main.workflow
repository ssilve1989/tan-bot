workflow "Main" {
  on = "push"
  resolves = ["TEST"]
}

action "Install" {
  uses = "docker://node:latest"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "docker://node:latest"
  args = "test"
}

action "TEST" {
  uses = "docker://node:latest"
  runs = "yarn"
}
