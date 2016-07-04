const VjsMenu = videojs.getComponent('Menu');

class QualityMenu extends VjsMenu {

  addItem(component) {
    super.addItem(component);

    //if Mobile Device and TOUCH_ENABLED is true, change event name to 'tap'.
    let event_name = (videojs.TOUCH_ENABLED && (videojs.IS_IOS || videojs.IS_ANDROID)) ? 'tap' : 'click';

    component.on(event_name, () => {
      let children = this.children();

      for (var i=0; i < children.length; i++) {
        var child = children[i];
        if (component !== child) {
          child.selected(false);
        }
      }

    });
  }

}

export default QualityMenu;
