export default class AdsEditing {
    state: any;

    constructor(state: any) {
        
        this.state = state

        this.buildBdgIdentifiers()

    }

    buildBdgIdentifiers() {

        this.state.data.buildings_operations.forEach((bdgop: any) => {

            if (bdgop.building.identifier == undefined) {
            
                if (bdgop.building.rnb_id == "new") {
                    bdgop.building.identifier = this.createNewBdgIdentifier()
                } else {
                    bdgop.building.identifier = bdgop.building.rnb_id
                }

            }
            
        })


    }

    updateNewBdgLngLat(lng: number, lat: number) {

        const op = this.state.data.buildings_operations.find((bdgop: any) => bdgop.building.identifier == this.state.bdg_move)
        if (op != undefined) {
            op.building.lat = lat
            op.building.lng = lng
        }
        
    }

    

    isEditingNewBdg() {
        return this.state.bdg_move != null && this.state.bdg_move != undefined && this.state.bdg_move != "";
    }
    
    get issue_number() {
        return this.state.data.issue_number
    }
    get insee_code() {
        return this.state.data.insee_code
    }
    get issue_date() {
        return this.state.data.issue_date
    }
    get buildings_operations() {
        return this.state.data.buildings_operations
    }
    get ops() {
        return this.state.data.buildings_operations
    }

    get newBdgOps() {

        const res = this.state.data.buildings_operations.filter((bdgop: any) => bdgop.building.rnb_id == "new")
        return res

    }

    setMovingBdg(identifier: string) {

        const op = this.state.data.buildings_operations.find((bdgop: any) => bdgop.building.identifier == identifier)
        if (op.building.rnb_id == "new") {
            this.state.bdg_move = identifier
            return
        }      

        throw new Error("Can't move an existing building")

    }

    createNewBdg() {
            
            this.data.buildings_operations.unshift({
                "building": {
                    "rnb_id": "new",
                    "identifier": this.createNewBdgIdentifier()
                },
                "operation": "build"
            })
    
    }

    createNewBdgIdentifier() {

            let length = 15;
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return "new-" + result;

    }


    updateBdgOperation(op: string, identifier: string) {

        this.state.data.buildings_operations = this.state.data.buildings_operations.map((bdgop: any) => {
            if (bdgop.building.identifier == identifier) {
                bdgop.operation = op
            }
            return bdgop
        }
        )

    }

    

    addOp(op: any) {

        this.state.data.buildings_operations.unshift(op)

    }

    hasIdentifier(identifier: string) {
        return this.state.data.buildings_operations.some((bdgop: any) => bdgop.building.identifier == identifier)    
    }

    removeIdentifier(identifier: string) {
        this.state.data.buildings_operations = this.state.data.buildings_operations.filter((bdgop: any) => bdgop.building.identifier != identifier)
    }

    addExistingBdg(rnb_id: string, lat: number, lng: number) {


        const op = {
            building: {
                rnb_id: rnb_id,
                identifier: rnb_id,
                lat: lat,
                lng: lng
            },
            operation: "build"
        }

        this.addOp(op)
        return op

    }

    addNewBdg() {

        const op = {
            building: {
                rnb_id: "new",
                identifier: this.createNewBdgIdentifier()
            },
            operation: "build"
        }

        this.addOp(op)
        return op

    }

    clone() {

        console.log("clone ADS")
        console.log("old state")
        console.log(this.state)

        const newState = JSON.parse(JSON.stringify(this.state))
        //const newState = {...this.state} // Shallow copy. Not good

        //const newState = Object.assign({}, this.state)

        console.log("new state")
        console.log(newState)
        

        return new AdsEditing(newState)

        

    }

}