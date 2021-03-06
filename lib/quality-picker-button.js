import QualityMenu from './quality-menu';
import QualityMenuItem from './quality-menu-item';

const VjsButton = videojs.getComponent('MenuButton');

class QualityPickerButton extends VjsButton {
  constructor(player, options) {
    super(player, options);

    this.controlText('Quality Menu');
  }

  createEl() {
    var el = super.createEl();

    this.resolution_text = videojs.createEl('span', {
      className: 'resolution',
      innerHTML: 'AUTO<span class="arrow"></span>'
    });

    el.appendChild(this.resolution_text);
    return el;
  }

  updateLabel(value) {
    this.resolution_text.innerHTML = value + '<span class="arrow"></span>';
  }

  createMenu() {
    var menu = new QualityMenu(this.player, this.options_);
    var menuItem;
    var options;
    for (var i=0; i < this.options_.qualityList.length; i++) {
      var quality = this.options_.qualityList[i];
      var {qualitySwitchCallback, trackType} = this.options_;
      options = Object.assign({qualitySwitchCallback, trackType}, quality, { selectable: true });

      menuItem = new QualityMenuItem(this.player, options);
      menu.addItem(menuItem);
    }

    return menu;
  }

  handleClick() {
    //super.handleClick();
    if (this.player_.hasClass('vjs-is-mobile')) {
      this.addClass('vjs-lock-showing');
    } else {
      this.player_.controlBar.settingMenu.closeMenu(false);
      this.toggleClass('vjs-lock-showing');
    }
  }
}

export default QualityPickerButton;
