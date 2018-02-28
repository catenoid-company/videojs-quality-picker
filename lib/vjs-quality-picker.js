import QualityPickerButton from './quality-picker-button';

function qualityPickerPlugin() {
    var player = this;
    var tech = this.tech_;

    let SUPPORTED_TRACKS = ["video", "audio", "subtitle"];
    let TRACK_CLASS = {
        video: 'vjs-icon-hd',
        audio: 'vjs-icon-cog',
        subtitle: 'vjs-icon-subtitles'
    };
    let QUALITY_DATA;

    tech.on('loadedqualitydata', onQualityData);
    tech.on('fragChanged', onFragChanged);

    function onFragChanged(event, data) {
        if (player.controlBar.getChild(SUPPORTED_TRACKS[0] + 'PickerButton')) {
            //get video picker button's auto menu element.
            var auto_menu = player.controlBar.getChild(SUPPORTED_TRACKS[0] + 'PickerButton').menu.children_[0];
            var current_quality_label = (QUALITY_DATA.video[data.frag.level + 1].label).toUpperCase();

            var qualityPickerButton = player.controlBar.getChild('videoPickerButton');
            qualityPickerButton.updateLabel(current_quality_label);

            //Hls.Events.FRAG_CHANGED triggered data parameter
            if (data.frag.autoLevel) {
                //quality_data.video[-1] = auto menu
                auto_menu.el_.childNodes[0].data = 'auto (' + current_quality_label + ')';
            } else {
                auto_menu.el_.childNodes[0].data = 'auto';
            }
        }
    }

    function onQualityData(event, {qualityData, qualitySwitchCallback}) {
        QUALITY_DATA = qualityData;

        /*var fullscreenToggle = player.controlBar.getChild('fullscreenToggle');
        player.controlBar.removeChild(fullscreenToggle);*/

        for (var i=0; i < SUPPORTED_TRACKS.length; i++) {
            var track = SUPPORTED_TRACKS[i];
            var name = track + "PickerButton";
            // videojs.utils.toTitleCase
            //name = name.charAt(0).toUpperCase() + name.slice(1);

            var qualityPickerButton = player.controlBar.getChild(name);
            if (qualityPickerButton) {
                qualityPickerButton.dispose();
                player.controlBar.removeChild(qualityPickerButton);
            }

            if (qualityData[track] && qualityData[track].length > 1) {
                qualityPickerButton = new QualityPickerButton(player, {name, qualityList: qualityData[track], qualitySwitchCallback, trackType: track});
                qualityPickerButton.addClass(TRACK_CLASS[track]);

                //player.controlBar.addChild(qualityPickerButton);
                ////Custom Control Spacer 엘리먼트의 다음 컴포넌트 앞에 배치시킨다.
                player.controlBar.addChild(qualityPickerButton);
                player.controlBar.el().insertBefore(qualityPickerButton.el(), player.controlBar.customControlSpacer.el().nextSibling);
            }
        }

        /*if (fullscreenToggle) {
            player.controlBar.addChild(fullscreenToggle);
        }*/
    }
}

var registerPlugin = videojs.registerPlugin || videojs.plugin;

registerPlugin('qualityPickerPlugin', qualityPickerPlugin);
