var rad3 = Math.sqrt(3);
var EASEVAL = .1;

Cell = function(i){
	this.index = i;

	this.side = 100;
	this.position = {x:0, y:0};
	this.targetPosition = {x:0, y:0};

	this.colorOn = '#ffffff';
	this.colorOff = '#000000';

	this.currentShape = 'square';

	// create the six points to be updated for each shape
	var points = [
	    new Two.Anchor(0, 0),
	    new Two.Anchor(0, 0),
	    new Two.Anchor(0, 0),
	    new Two.Anchor(0, 0),
	    new Two.Anchor(0, 0),
	    new Two.Anchor(0, 0)
	];
	this.shape = two.makePolygon(points);
	this.shape.stroke = 'rgb(223,91,87)';
	this.shape.linewidth = 4;
	this.shape.fill = 'rgb(240, 240, 240)';

	this.targetVertices = [{x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}];
}

Cell.prototype = {
	init : function(i){
		this.index = i;
		this.side = 100;
		this.position = {x:0, y:0};
		this.targetPosition = {x:0, y:0};

		this.colorOn = '#ffffff';
		this.colorOff = '#000000';


		this.currentShape = 'square';

		// create the six points to be updated for each shape
		var points = [
		    new Two.Anchor(0, 0),
		    new Two.Anchor(side, 0),
		    new Two.Anchor(side*3/2, side*rad3/2),
		    new Two.Anchor(side, side*rad3),
		    new Two.Anchor(0, side*rad3),
		    new Two.Anchor(-side/2, side*rad3/2)
		];
		this.shape = two.makePolygon(points);
		this.shape.translation.set(300, 100);
		this.shape.stroke = 'rgb(0,0,0)';
		this.shape.fill = 'rgb(255,0,0)';

		this.targetVertices = [{x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}];
	},

	setShape : function(shape){
		
		switch(shape){

			case 'hexagon':
					// determine the side length
					this.side = 1000 / (COLS * 3);

				    this.targetPosition.x = (this.index%COLS+(.5*(Math.floor(this.index/COLS)%2)))*this.side*3;
				    this.targetPosition.y = Math.floor(this.index/COLS)*this.side*rad3/2;

					// set vertices targets
					this.targetVertices[0] = {x: 0, y: 0};
					this.targetVertices[1] = {x: this.side, y: 0};
					this.targetVertices[2] = {x: this.side*3/2, y: this.side*rad3/2};
					this.targetVertices[3] = {x: this.side, y: this.side*rad3};
					this.targetVertices[4] = {x: 0, y: this.side*rad3};
					this.targetVertices[5] = {x: -this.side/2, y: this.side*rad3/2};

				break;

			case 'square':
					// determine the side length
					this.side = 1000 / COLS;

				    this.targetPosition.x = (this.index%COLS)*this.side;
				    this.targetPosition.y = Math.floor(this.index/COLS)*this.side;

					// set vertices targets
					this.targetVertices[0] = {x: 0, y: 0};
					this.targetVertices[1] = {x: this.side, y: 0};
					this.targetVertices[2] = {x: this.side, y: this.side/2};
					this.targetVertices[3] = {x: this.side, y: this.side};
					this.targetVertices[4] = {x: 0, y: this.side};
					this.targetVertices[5] = {x: 0, y: this.side/2};

					console.log("target position x: " + this.targetPosition.x + " y: " + this.targetPosition.y);

				break;

			case 'triangle':
					// determine the side length
					this.side = 1000 / COLS;

					var isArrowUp = this.index%2;

					var oddRow = Math.floor(this.index/COLS)%2;	// start the odd rows on the opposite of even rows

					if(oddRow == 0){
						isArrowUp += 1;
						isArrowUp = isArrowUp%2;
					}

				      
				    this.targetPosition.x = this.side*(this.index%COLS)/2;
				    this.targetPosition.y = Math.floor(this.index/COLS)/2*this.side*rad3;

					// set vertices targets
					if(isArrowUp == 0) {
						this.targetVertices[0] = {x: 0, y: 0};
						this.targetVertices[1] = {x: this.side/2, y: 0};
						this.targetVertices[2] = {x: this.side, y: 0};
						this.targetVertices[3] = {x: this.side*3/4, y: this.side*rad3/4};
						this.targetVertices[4] = {x: this.side/2, y: this.side*rad3/2};
						this.targetVertices[5] = {x: this.side/4, y: this.side*rad3/4};
					}
					else {
						this.targetVertices[0] = {x: this.side/2, y: 0};
						this.targetVertices[1] = {x: this.side/2, y: 0};
						this.targetVertices[2] = {x: this.side, y: this.side*rad3/2};
						this.targetVertices[3] = {x: this.side, y: this.side*rad3/2};
						this.targetVertices[4] = {x: 0, y: this.side*rad3/2};
						this.targetVertices[5] = {x: 0, y: this.side*rad3/2};
					}

				break;
		}
		// set current shape
		this.currentShape = shape;
	},

	getNeighbors : function(){
		switch(shape){

			case 'hexagon':
				break;

			case 'square':
				break;

			case 'hexagon':
				break;
		}
	},

	setColorOn : function(color){
		this.colorOn = color;
	},

	setColorOff : function(color){
		this.colorOff = color;
	},

	setFill : function(color){
		this.shape.fill = color;
	},

	setStroke : function(color){
		this.shape.stroke = color;
	},

	update : function(){
		// update the position of the shape
		// console.log("target position x: " + this.targetPosition.x);
		// console.log("actual position x: " + this.position.x);

		if(Math.abs(this.targetPosition.x - this.position.x) > 0.5 || Math.abs(this.targetPosition.y - this.position.y) > 0.5) {
			this.position.x = this.position.x + EASEVAL * (this.targetPosition.x - this.position.x);
			this.position.y = this.position.y + EASEVAL * (this.targetPosition.y - this.position.y);

			this.shape.translation.set(this.position.x, this.position.y);			
		}

		// update the position of vertices
		for(var i = 0; i<6; i++) {
			if(Math.abs(this.targetVertices[i].x - this.shape.vertices[i].x) > 0.5)
				this.shape.vertices[i].x = this.shape.vertices[i].x + EASEVAL * (this.targetVertices[i].x - this.shape.vertices[i].x);
			if(Math.abs(this.targetVertices[i].y - this.shape.vertices[i].y) > 0.5)
				this.shape.vertices[i].y = this.shape.vertices[i].y + EASEVAL * (this.targetVertices[i].y - this.shape.vertices[i].y);
		}

	},

	draw : function(){

	}

}