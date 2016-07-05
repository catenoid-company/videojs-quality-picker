const VjsMenu = videojs.getComponent('Menu');

class QualityMenu extends VjsMenu {

  addItem(component) {
    super.addItem(component);

    // Initialize the ad container when the video player is clicked, but only the
    // first time it's clicked.
    var startEvent = 'click';
    if (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) {
      startEvent = 'tap';
    }

    component.on(startEvent, () => {
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
