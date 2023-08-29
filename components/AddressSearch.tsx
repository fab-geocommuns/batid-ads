// Context
import {MapContext} from '@/components/MapContext'
import { useContext, useRef } from 'react';

// Bus
import Bus from '@/utils/Bus';

// Store
import { useDispatch, useSelector } from "react-redux";
import { setMoveTo, setAddressSearchQuery, setAddressSearchResults, setMarker } from '@/stores/map/slice';

export default function AddressSearch() {


    // State
    const moveTo = useSelector((state) => state.moveTo)
    const dispatch = useDispatch()

    const apiUrl = 'https://api-adresse.data.gouv.fr/search/'
    const [mapCtx, setMapCtx] = useContext(MapContext)
    const addressInput = useRef(null)

    const handleKeyDown = async (e) => { 

        if (e.key === 'Enter') {

            e.preventDefault();

            // Add the query to the store
            const geocode_result = await geocode(addressInput.current.value);

            dispatch(setAddressSearchQuery(addressInput.current.value))
            dispatch(setAddressSearchResults(geocode_result.features))


            if (geocode_result.features.length > 0) {

                const position = featureToPosition(geocode_result.features[0])

                // Add a marker to the map
                dispatch(setMarker({
                    lat: position.lat,
                    lng: position.lng
                }))

                // Move the map to the position
                dispatch(setMoveTo(position))

                Bus.emit('address:search', {
                    search: geocode_result
                })
            }
        }

        
        

    }

    const featureToPosition = (feature: any) => {

        const mapPosition = {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
            zoom: 17
        }

        if (feature.properties.type == "municipality") {
            mapPosition.zoom = 13
          }
          if (feature.properties.type == "housenumber") {
            mapPosition.zoom = 18
          }
          return mapPosition

    }

    const geocode = async (query: string) => {

        let best_point = null;
        return await fetchBanAPI(query);

    }
    const fetchBanAPI = async (query) => {

        let query_url = new URL(apiUrl);
        query_url.searchParams.set('q', query);

        return new Promise((resolve, reject) => {

            fetch(query_url)
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })

    }

    

    return (
        <>
        <input 
        className="fr-input" 
        placeholder='ex : 1 rue de la paix, Paris'
        type="text" 
        autoComplete='off'
        name="address" 
        id="address"
        ref={addressInput}
        onKeyDown={handleKeyDown}
         />
        
        </>
    )

}