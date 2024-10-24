class DestinationService {
    constructor(scene, jsonPath) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new DestinationController();
        this.destinationViews = [];
    }

    // Tải dữ liệu destination từ JSON và thêm vào DestinationController
    async loadDestinations() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.destinations.forEach(destinationData => {
                const dto = new DestinationDTO(
                    destinationData.id,
                    destinationData.positionX,
                    destinationData.positionY,
                    destinationData.radius,
                    destinationData.origin,
                    destinationData.shape,
                    destinationData.levelNumber
                );
                this.controller.addDestination(dto);
            });
            return this.controller.getAllDestinations();
        } catch (error) {
            console.error("Error loading destinations:", error);
            return [];
        }
    }

    // Khởi tạo các DestinationView dựa trên levelNumber
    async initialize(levelNumber) {
        const destinations = await this.loadDestinations();
        const specificDestinationDTO = destinations.find(dto => dto.id === levelNumber);
        if (specificDestinationDTO) {
            this.createDestinationView(specificDestinationDTO);
        }
    }

    // Tạo DestinationView và thêm vào scene
    createDestinationView(dto) {
        const destinationView = new DestinationView(this.scene, dto);
        destinationView.phaserObject.label = 'destination';
        this.destinationViews.push(destinationView);
        return destinationView;
    }

    // Cập nhật DestinationView khi DTO thay đổi
    updateDestinationView(dto) {
        const destinationView = this.destinationViews.find(view => view.destinationData.id === dto.id);
        if (destinationView) {
            destinationView.updateDestination();
        }
    }

    // Cập nhật dữ liệu destination và đồng bộ với view
    updateDestination(id, newData) {
        // Cập nhật DTO thông qua DestinationController
        this.controller.updateDestination(id, newData);
        const updatedDestination = this.controller.getDestinationById(id);
        if (updatedDestination) {
            // Cập nhật view tương ứng
            this.updateDestinationView(updatedDestination);
        }
    }

    // Lấy tất cả các DestinationView
    getAllDestinationViews() {
        return this.destinationViews;
    }

    // Lấy DestinationView theo ID
    getDestinationViewById(id) {
        return this.destinationViews.find(view => view.destinationData.id === id);
    }

    // Lấy DestinationDTO theo ID
    getDestinationDTOById(id) {
        return this.controller.getDestinationById(id);
    }

    // Lấy tất cả các DestinationDTOs
    getAllDestinationDTOs() {
        return this.controller.getAllDestinations();
    }
}
