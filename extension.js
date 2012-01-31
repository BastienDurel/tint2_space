
const Main = imports.ui.main;
const St = imports.gi.St;
const Lang = imports.lang;

function tint2_space() {
    this._init();
}

tint2_space.prototype = {
    _init : function() {
        this.actor = new St.BoxLayout({ style_class: 'bottom-panel',
                                        name: 'bottomPanel',
                                        reactive: true });
        this.actor._delegate = this;

	let m = Main.layoutManager.monitors.length;

        Main.layoutManager.addChrome(this.actor, { affectsStruts: true });

        this.actor.connect('style-changed', Lang.bind(this, this.relayout));
        global.screen.connect('monitors-changed', Lang.bind(this,
                                                     this.relayout));
    },

    relayout: function() {
        let primary = Main.layoutManager.primaryMonitor;

        let h = 31;
        this.actor.set_position(primary.x, primary.y+primary.height-h);
        this.actor.set_size(1, 32);
    },

    _configOne: function(i) {
	this.actors[i] = new St.BoxLayout({ style_class: 'bottom-panel',
                                        name: 'bottomPanel',
                                        reactive: true });
	this.actors[i]._delegate = this;
	Main.layoutManager.addChrome(this.actors[i], { affectsStruts: true });
	
        this.actors[i].connect('style-changed', Lang.bind(this, this.relayout));
        global.screen.connect('monitors-changed', Lang.bind(this,
                                                     this.relayout));
    }
};

let tint2space = null;

function init(extensionMeta) {
}

function enable() {
    Main.wm._reset();

    tint2space = new tint2_space();
    tint2space.relayout();
}

function disable() {

    Main.wm._reset();

    if ( tint2space ) {
        Main.layoutManager.removeChrome(tint2space.actor);
        tint2space = null;
    }
}

