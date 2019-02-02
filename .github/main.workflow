workflow "Main" {
  on = "push"
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
