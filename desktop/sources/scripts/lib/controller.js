'use strict'

function Controller () {
  const fs = require('fs')
  const { dialog, app } = require('electron').remote

  this.menu = { default: {} }
  this.mode = 'default'

  this.app = require('electron').remote.app

  this.start = function () {
  }

  this.add = function (mode, cat, label, fn, accelerator) {
    if (!this.menu[mode]) { this.menu[mode] = {} }
    if (!this.menu[mode][cat]) { this.menu[mode][cat] = {} }
    this.menu[mode][cat][label] = { fn: fn, accelerator: accelerator }
    console.log(`${mode}/${cat}/${label} ${accelerator ? '<' + accelerator + '>' : ''}`)
  }

  this.format = function () {
    const f = []
    const m = this.menu[this.mode]
    for (const cat in m) {
      const submenu = []
      for (const name in m[cat]) {
        const option = m[cat][name]
        if (option.role) {
          submenu.push({ role: option.role })
        } else {
          submenu.push({ label: name, accelerator: option.accelerator, click: option.fn })
        }
      }
      f.push({ label: cat, submenu: submenu })
    }
    return f
  }

  this.commit = function () {
    this.app.injectMenu(this.format())
  }
}


module.exports = new Controller()
