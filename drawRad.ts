namespace MyApp {
    class Yi {
        //一
        public cYi = [0.3, 0.9, 1.8, 0.90];
        //彡
        public radVariation1 = 100;
        public lines = [this.cYi[0], this.cYi[1], this.cYi[2], this.cYi[3]];
    }
    class Er {
        //二
        public cEr = [0.40, 0.60, 1.65, 0.61,
            0.30, 1.50, 1.70, 1.50];
        public radVariation1 = 100;
        public lines = [this.cEr[0], this.cEr[1], this.cEr[2], this.cEr[3],
            this.cEr[4], this.cEr[5], this.cEr[6], this.cEr[7]];
    }
    class San {
        //三
        public cSan = [0.40, 0.50, 1.65, 0.50,
            0.50, 1.00, 1.50, 1.00,
            0.30, 1.50, 1.70, 1.50];
        public radVariation1 = 100;
        public lines = [this.cSan[0], this.cSan[1], this.cSan[2], this.cSan[3],
            this.cSan[4], this.cSan[5], this.cSan[6], this.cSan[7],
            this.cSan[8], this.cSan[9], this.cSan[10], this.cSan[11]];
    }
    class Shan {
        public cShan = [0.65, 0.90, 1.5, 0.40,
            0.60, 1.3, 1.49, 0.80,
            0.55, 1.7, 1.55, 1.2];
        public radVariation1 = 100;
        //heavyPoint is where the curve is at its steepest difference from the original linear line
        public heavyPoint = { x: 20, y: null };
        //heavyWeight is how steep the curve is
        public heavyWeight = 110;
        public lines = [this.cShan[0], this.cShan[1], this.cShan[2], this.cShan[3],
            this.cShan[4], this.cShan[5], this.cShan[6], this.cShan[7],
            this.cShan[8], this.cShan[9], this.cShan[10], this.cShan[11]];
        public heavyLine = [0, 1, 2];
    }
    class Gun {
        public radVariation1 = 100;
        public lines = [1.01, 0.2, .98, 1.7];
    }
    class Zhu {
        public radVariation1 = 100;
        public lines = [0.8, 0.8, .95, .96];
    }
    class Pu {
        public cYi = [0.3, 0.9, 1.8, 0.90];
        public radVariation1 = 100;
        public heavyWeight = -110;
        public heavyPoint = { x: 20, y: null };
        public lines = [1.0001, 0.2, 1, this.cYi[3],
            1.0001, (0.2 + this.cYi[1] / 2), this.cYi[2] + .05, (.2 + this.cYi[3] / 2),
            this.cYi[0], this.cYi[1], this.cYi[2], this.cYi[3],
            this.cYi[2], this.cYi[3], (this.cYi[0] - .05), (this.cYi[1] * 2),
            this.cYi[0], this.cYi[1], (this.cYi[2] + .05), (this.cYi[3] * 2)
        ];
        public heavyLine = [3, 4];
    }
    class Fu {
        public radVariation1 = 100;
        public heavyWeight = -200;
        //public heavyPoint = {x:
    }
    export class HomeController {
        //if it is a certain variation on the radical, draw it that varied way so that 木 can be drawn both ways in 林
        //if radLength is full, then draw it like a normal character, if it is one of the variations as it appears in another character draw it there, maybe by where in the character it appears, with numbers given to separate instances of the grid being taken up by the radical in question. If numbers are given to the parts of the hole that it takes up and those numbers don't equal the available number of parts in the whole character then fill out the size of the radical to meet the size of the full character
        public startPos;
        public endPos;
        public numOfSteps = 60;
        public stepSize;
        public newXEnd;
        public newYEnd;
        public radVariation;
        public radicalClass;
        public radLength;
        public skipTheEnd = false;
        public currentLine = 0;
        public i;
        public puFull = new Pu();
        public line;
        public lines;
        public canvasR = (<HTMLCanvasElement>document.getElementById('myCanvas'));
        public cr = this.canvasR.getContext("2d");
        public cw = this.canvasR.width * 0.5;
        public ch = this.canvasR.height * 0.5;
        public ca = [0, this.canvasR.width * .25];
        public cb = [this.canvasR.width * .25, this.canvasR.width * .5];
        public cc = [this.canvasR.width * .5, this.canvasR.width * .75];
        public cd = [this.canvasR.width * .75, this.canvasR.width];
        public ra = [0, this.canvasR.height * .25];
        public rb = [this.canvasR.height * .25, this.canvasR.height * .5];
        public rc = [this.canvasR.height * .5, this.canvasR.height * .75];
        public rd = [this.canvasR.height * .75, this.canvasR.height];
        public intervalDraw = window.setInterval(this.drawLine, 25, this.radicalClass);
        public initGrid() {
            this.cr.lineWidth = 1;
            this.cr.strokeStyle = '#000000';
            this.cr.beginPath();
            this.cr.moveTo(this.ca[0], this.rb[0]);
            this.cr.lineTo(this.cd[1], this.rb[0]);
            this.cr.stroke();
            this.cr.beginPath();
            this.cr.moveTo(this.ca[0], this.rc[0]);
            this.cr.lineTo(this.cd[1], this.rc[0]);
            this.cr.stroke();
            this.cr.beginPath();
            this.cr.moveTo(this.ca[0], this.rd[0]);
            this.cr.lineTo(this.cd[1], this.rd[0]);
            this.cr.stroke();
            this.cr.beginPath();
            this.cr.moveTo(this.ca[1], this.ra[0]);
            this.cr.lineTo(this.ca[1], this.rd[1]);
            this.cr.stroke();
            this.cr.beginPath();
            this.cr.moveTo(this.cc[1], this.ra[0]);
            this.cr.lineTo(this.cc[1], this.rd[1]);
            this.cr.stroke();
            this.cr.beginPath();
            this.cr.moveTo(this.cb[1], this.ra[0]);
            this.cr.lineTo(this.cb[1], this.rd[1]);
            this.cr.stroke();
            if (this.currentLine == 0) {
                this.radicalClass = this.puFull;
                this.line = this.radicalClass.lines.slice(0, 5);
                this.radVariation = this.radicalClass.radVariation1;
                this.startPos = { x: this.line[0] * this.radVariation, y: this.line[1] * this.radVariation };
                this.endPos = { x: this.line[2] * this.radVariation, y: this.line[3] * this.radVariation };
                this.stepSize = { x: ((this.endPos.x - this.startPos.x) / this.numOfSteps), y: ((this.endPos.y - this.startPos.y) / this.numOfSteps) };
                this.drawLine(this.startPos, this.endPos, this.stepSize);
            }
        };
        constructor() {
            this.initGrid();
            let yiFull = new Yi();
            let erFull = new Er();
            let sanFull = new San();
            let shanFull = new Shan();
            let gunFull = new Gun();
            let zhuFull = new Zhu();
            let fuFull = new Fu();
        }
        public drawLine(startPos, endPos, stepSize) {
            //to make it curve, alter the stepSize as it goes
            if (this.radicalClass.heavyLine) {
                for (let i = 0; i < this.radicalClass.heavyLine.length; i++) {
                    if (this.radicalClass.heavyLine[i] == this.currentLine) {
                        if (this.radicalClass.heavyPoint.x) {
                            if (this.startPos.x <= radClass.heavyPoint.x) {
                                this.stepSize.x += this.stepSize.x / radClass.heavyWeight;
                            } else {
                                this.stepSize.x -= this.stepSize.x / radClass.heavyWeight;
                            }
                        }
                        else if (radClass.heavyPoint.y) {
                            if (this.startPos.y <= radClass.heavyPoint.y) {
                                this.stepSize.y += this.stepSize.y / radClass.heavyWeight;
                            } else {
                                this.stepSize.y -= this.stepSize.x / radClass.heavyWeight;
                            }
                        }
                    }
                }
            }
            this.cr.lineWidth = 5;
            this.cr.strokeStyle = '#ffffff';
            this.cr.beginPath();
            this.cr.moveTo(this.startPos.x, this.startPos.y);
            //don't forget to change this to work with negatives
            if (this.startPos.x == this.endPos.x || this.skipTheEnd) {
                clearInterval(this.intervalDraw);
                this.currentLine++;
                this.line = radClass.lines.slice(0 + this.currentLine * 4, 5 + this.currentLine * 4);
                this.radVariation = radClass.radVariation1;
                this.skipTheEnd = false;
                this.startPos = { x: this.line[0] * this.radVariation, y: this.line[1] * this.radVariation };
                this.endPos = { x: this.line[2] * this.radVariation, y: this.line[3] * this.radVariation };
                this.stepSize = { x: ((this.endPos.x - this.startPos.x) / this.numOfSteps), y: ((this.endPos.y - this.startPos.y) / this.numOfSteps) };
                this.intervalDraw = window.setInterval(this.drawLine, 25, this.startPos, this.endPos, this.stepSize);
            } else {
                //if the slope is negative
                if (this.stepSize.x < 0) {
                    if (this.stepSize.y >= 0) {
                        this.newXEnd = this.stepSize.x + this.startPos.x;
                        this.newYEnd = this.stepSize.y + this.startPos.y;
                    }
                    if (this.startPos.x - this.stepSize.x <= this.endPos.x) {
                        if (radClass.heavyLine) {
                            for (let i = 0; i < radClass.heavyLine.length; i++) {
                                if (radClass.heavyLine[i] == this.currentLine) {
                                    this.skipTheEnd = true;
                                }
                            }
                        } else {
                            this.newXEnd = this.endPos.x;
                        }
                        if (this.stepSize.y < 0) {
                            this.newYEnd = this.startPos.y - this.stepSize.y;
                        }
                        else {
                            this.newYEnd = this.startPos.y + this.stepSize.y;
                        }
                    }
                }
                else if (this.stepSize.x >= 0) {
                    //all of this is the same as the above block, but with positive instead of negative.
                    if (this.stepSize.y >= 0) {
                        this.newXEnd = this.stepSize.x + this.startPos.x;
                        this.newYEnd = this.stepSize.y + this.startPos.y;
                    }
                    else if (this.stepSize.y < 0) {
                        this.newXEnd = this.stepSize.x + this.startPos.x;
                        this.newYEnd = this.stepSize.y + this.startPos.y;
                    }
                    if (this.startPos.x + this.stepSize.x >= this.endPos.x) {
                        if (radClass.heavyLine) {
                            for (let i = 0; i < radClass.heavyLine.length; i++) {
                                if (radClass.heavyLine[i] == this.currentLine) {
                                    this.skipTheEnd = true;
                                }
                            }
                        } else {
                            this.newXEnd = this.endPos.x;
                        }
                        if (this.stepSize.y < 0) {
                            this.newYEnd = this.startPos.y - this.stepSize.y;
                        } else { this.newYEnd = this.startPos.y + this.stepSize.y; }
                    }
                }
                //new start position is the numbers calculated above.
                this.startPos = { x: this.newXEnd, y: this.newYEnd };
                //draw the line to the new coordinates.
                if (!this.skipTheEnd) {
                    this.cr.lineTo(this.newXEnd, this.newYEnd);
                    this.cr.stroke();
                }
            }
        }
    }
}

