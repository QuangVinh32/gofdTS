class DestinationController {
    constructor() {
        this.destinations = [];
    }

    addDestination(dto) {
        this.destinations.push(dto);
    }

    getAllDestinations() {
        return this.destinations;
    }
    getDestinationById(id) {
        return this.destinations.find(destination => destination.id === id);
    }

    updateDestination(id, newData) {
        const destination = this.getDestinationById(id);
        if (destination != null) {
            destination.set
        } else {
            console.error(`Destination với ID ${id} không tồn tại.`);
        }
    }

 
}
