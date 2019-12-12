$(function() {
    var Elevator = function() {
        this.targetFloor = null;
        this.targetButton = null;
        //Initialize Floor
        setInitalFloorDisplayState();
        this.currentFloor = 1;
        this.queue = [];
        $('.button').on('click', this, this.enQueue);
    }
    Elevator.prototype.changeFloor = function(indicator) {
        if (indicator != '') {
            $(indicator).animate({
                opacity: 1
            });
        }
        showFloor(this.currentFloor, this.targetFloor);
        setTimeout(function() {
            $(indicator).animate({
                opacity: 0
            }, 400);
            this.currentFloor = this.targetFloor;
            $('#floor-number').fadeOut(500, function() {
                $('#floor-number').html(this.currentFloor).fadeIn(500);
                this.targetButton.removeClass('glow');
            }.bind(this));
            this.targetFloor = null;
            this.targetButton.on('click', elevator, this.enQueue);
            this.checkQueue();
        }.bind(this), 1000);
    };
    Elevator.prototype.enQueue = function(event) {
        var targetElevator = event.data;
        var button = $(this);
        targetElevator.queue.push(button);
        button.addClass('glow');
        $(button).off('click');
        targetElevator.checkQueue();
    };
    Elevator.prototype.checkQueue = function() {
        if (this.queue.length && this.targetFloor === null) {
            this.targetButton = this.queue.splice(0, 1)[0];
            this.targetFloor = Number(this.targetButton.text());
            if (this.targetFloor > this.currentFloor) {
                this.changeFloor('#green-indicator');
            } else if (this.targetFloor < this.currentFloor) {
                this.changeFloor('#red-indicator');
            } else {
                this.changeFloor('');
            }
        }
    };
    var elevator = new Elevator();
});

function showFloor(fCurrent, fTarget) {
    if (fCurrent == fTarget) return;
    if (fTarget < fCurrent) {
        for (i = 4; i > fTarget; i--) {
            var timeout = 1000 + (i * 100);
            $("#floor" + i).hide(timeout);
        }
    } else {
        for (j = 1; j <= fTarget; j++) {
            var timeout = 1000 + (j * 100);
            $("#floor" + j).show(timeout);
        }
    }
    return;
}

function setInitalFloorDisplayState() {
    $(".level:not(#floor1)").hide();
    return;
}