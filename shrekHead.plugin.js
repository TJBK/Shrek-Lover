//META{"name":"Shrek Love"}*//

var shrek = function () {};

shrek.prototype.start = function () {

    var canvas = document.createElement('canvas');
    canvas.style = 'position:absolute;width:100%;height:100%;z-index:99;pointer-events:none;';
    canvas.id = 'myCanvas';

    $('.app').prepend(canvas);

    this.draw();
};

shrek.prototype.draw = function () {
    canvas = document.getElementById('myCanvas');
    c = canvas.getContext('2d');

    var spawnKey = 5;

    emoteIndex = [];
    activeEmote = 0;

    emotePaths = [
        "https://my.mixtape.moe/wqjlus.png",
        "https://my.mixtape.moe/pjdtaq.ico",
    ];

    Render(); //Renders the canvas

    function Render() {
        requestAnimationFrame(Render);
        SetCanvasSize();
        EmoteManager();
        SpawnEmote();
    }

    //setInterval(SpawnEmote, 10);

    function SpawnEmote() {
        var ranPath = Math.floor(Math.random() * emotePaths.length + 0);

        if (Math.floor(Math.random() * 100 + 0) == spawnKey) {
            new Emote(Math.random() * canvas.width, 0, emotePaths[0]);
            console.log('created');
        }
    }

    function EmoteManager() {
        for (var i in emoteIndex) {
            emoteIndex[i].draw();
            emoteIndex[i].manage();
        }
    }

    //Helper functions

    function SetCanvasSize() {
        canvas.width = window.innerWidth - 20;
        canvas.height = window.innerHeight - 20;
    }

    function Emote(x, y, file) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random();
        this.img = new Image();

        this.path = file;
        this.img.src = this.path;

        activeEmote++;
        emoteIndex[activeEmote] = this;
        this.id = activeEmote;
    }

    Emote.prototype.draw = function () {
        c.drawImage(this.img, this.x, this.y);
    };

    Emote.prototype.manage = function () {
        this.x += this.vx;
        this.y += this.vy;

        Math.random() > 0.47 ? this.vx += 0.1 : this.vx += -0.1
        Math.random() > 0.47 ? this.vy += 0.1 : this.vy += -0.1

        if (this.x >= canvas.width || this.x + this.img.width <= 0)
            delete emoteIndex[this.id];

        if (this.y >= canvas.height || this.x + this.img.height <= 0)
            delete emoteIndex[this.id];
    };
};

shrek.prototype.load = function () {};
shrek.prototype.unload = function () {};
shrek.prototype.stop = function () {};
shrek.prototype.getSettingsPanel = function () {
    return '';
};
shrek.prototype.getName = function () {
    return "Shrek Love";
};
shrek.prototype.getDescription = function () {
    return "Have shrek spam your discord";
};
shrek.prototype.getVersion = function () {
    return "0.5.0";
};
shrek.prototype.getAuthor = function () {
    return "TJBK";
};