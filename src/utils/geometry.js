// Import the necessary Turf functions
import { lineString, lineIntersect, booleanCrosses } from '@turf/turf';

// Converts an array of coordinates to a LineString feature
const coordinatesToLineString = (coordinates) => {
    return lineString(coordinates.map(coord => coord ? [coord.longitude, coord.latitude]: []));
}; 

// Use `lineIntersect` from Turf.js like so:
const linesIntersect = (line1, line2) => {
    const intersection = lineIntersect(line1, line2);
    return intersection.features.length > 0;
};

// Checks if the new line created by the last point and the new point intersects with any other line in the polygon
// export const doesLineIntersect = (coordinates, newCoordinate) => {
//     if (coordinates.length < 2) {
//         // Not enough points to form an intersection
//         return false;
//     }

//     const lastCoord = coordinates[coordinates.length - 1];
//     const newLine = coordinatesToLineString([lastCoord, newCoordinate]);

//     // Check for intersections with all segments except the last one connecting to the new point
//     for (let i = 0; i < coordinates.length - 2; i++) {
//         const currentLine = coordinatesToLineString([coordinates[i], coordinates[i + 1]]);
//         if (linesIntersect(newLine, currentLine)) {
//             return true;
//         }
//     }

//     // Handle the case where the polygon would close
//     if (coordinates.length > 2) {
//         const closingLine = coordinatesToLineString([coordinates[0], newCoordinate]);
//         if (linesIntersect(newLine, closingLine)) {
//             return true;
//         }
//     }

//     return false;
// };

export const doesLineIntersect = (coordinates, newCoordinate) => {
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ', coordinates, newCoordinate)
    const lastCoord = coordinates[coordinates.length - 1];

    let line1 = null;
    if (lastCoord) {
        line1 = coordinatesToLineString([lastCoord, newCoordinate]);
    }
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', line1)

    // Check intersection with all lines of the current polygon except the last one
    for (let i = 0; i < coordinates.length - 2; i++) {
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ::::::::::::::::::::###########  ',coordinates, lastCoord,coordinates[0], coordinates[1])
        const line2 = coordinatesToLineString([coordinates[i], coordinates[i + 1]]);
        const line3 = coordinatesToLineString([coordinates[coordinates.length - 1], coordinates[coordinates.length - 2]]);
        const line4 = coordinatesToLineString([coordinates[0], newCoordinate]);
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line2 ', line2.geometry.coordinates)
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line1 ', line1.geometry.coordinates)
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line3 ', line3.geometry.coordinates)
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line4 ', line4.geometry.coordinates)
        const intersection = lineIntersect(line1, line2);
        const lastIntersection = lineIntersect(line4, line3);
        console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ::::::: ', intersection, lastIntersection)
        if (intersection.features.length > 0 || lastIntersection.features.length > 0) {
            // If the lines intersect, return true
            return true;
        }
    }

    // No intersections found, return false
    return false;
};
export const doesLineIntersectForDrag = (coordinates, newCoordinate, index) => {
    console.log('Checking intersection...', coordinates, newCoordinate);
    
    if (coordinates.length < 2) {
        console.log('Not enough coordinates to form lines.');
        return false;
    }

    const lastCoord = coordinates[coordinates.length - 1];
    if (!lastCoord) {
        console.error('Last coordinate is missing.');
        return false;
    }

    const line1 = coordinatesToLineString([lastCoord, newCoordinate]);
    console.log('New line segment:', line1);

    for (let i = 0; i < coordinates.length - 1; i++) {
        const line2 = coordinatesToLineString([coordinates[i], coordinates[i + 1]]);
        console.log('Checking against line segment:', line2);

        const intersection = lineIntersect(line1, line2);
        if (intersection.features.length > 0) {
            console.log('Intersection found:', intersection);
            return true;
        }
    }

    const firstLine = coordinatesToLineString([coordinates[0], newCoordinate]);
    const lastLine = coordinatesToLineString([coordinates[coordinates.length - 1], coordinates[coordinates.length - 2]]);
    const lastIntersection = lineIntersect(firstLine, lastLine);
    console.log('Checking against polygon closure:', firstLine, lastLine);

    if (lastIntersection.features.length > 0) {
        console.log('Intersection found with polygon closure:', lastIntersection);
        return true;
    }

    console.log('No intersections found.');
    return false;
};




// Check if a new segment intersects with existing segments in the polygon
export const checkIntersection = (coordinates, newCoordinate) => {
    if (coordinates.length < 2) return false;

    const newLine = lineString([
        [coordinates[coordinates.length - 1].longitude, coordinates[coordinates.length - 1].latitude],
        [newCoordinate.longitude, newCoordinate.latitude]
    ]);

    for (let i = 0; i < coordinates.length - 1; i++) {
        const existingLine = lineString([
            [coordinates[i].longitude, coordinates[i].latitude],
            [coordinates[i + 1].longitude, coordinates[i + 1].latitude]
        ]);
        if (booleanCrosses(newLine, existingLine)) {
            return true;
        }
    }

    // Additionally, check if the new line intersects with the closing line of the polygon
    if (coordinates.length > 2) {
        const closingLine = lineString([
            [coordinates[coordinates.length - 1].longitude, coordinates[coordinates.length - 1].latitude],
            [coordinates[0].longitude, coordinates[0].latitude]
        ]);
        if (booleanCrosses(newLine, closingLine)) {
            return true;
        }
    }

    return false;
};



// Function to calculate the centroid of the polygon points
function calculateCentroid(points) {
    let x = 0, y = 0;
    for (let point of points) {
      x += point.latitude;
      y += point.longitude;
    }
    return { latitude: x / points.length, longitude: y / points.length };
  }
  
  // Function to calculate the angle between the centroid and a point
  function calculateAngle(point, centroid) {
    return Math.atan2(point.latitude - centroid.latitude, point.longitude - centroid.longitude);
  }
  
  // Function to sort points to avoid intersection
export  function sortPoints(points) {
    const centroid = calculateCentroid(points);
    return points.sort((a, b) => calculateAngle(a, centroid) - calculateAngle(b, centroid));
  }

  // Function to sort all polygons in a 2D array
export function sortPolygons(polygons) {
    return polygons.map(polygon => sortPoints(polygon));
  }

// // Import the necessary Turf functions
// import { lineString, lineIntersect } from '@turf/turf';

// // Converts an array of coordinates to a LineString feature
// const coordinatesToLineString = (coordinates) => {
//     console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', coordinates)
//     return lineString(coordinates.map(coord => [coord.longitude, coord.latitude]));
// };

// // Checks if the new line created by the last point and the new point intersects with any other line in the polygon
// export const doesLineIntersect = (coordinates, newCoordinate) => {
//     let lines = []
//     const lastCoord = coordinates[coordinates.length - 1];
//     let line1 = null;
//     if (lastCoord) {
//         line1 = coordinatesToLineString([lastCoord, newCoordinate]);
//     }
//     if (coordinates.length > 2) {
//         const reverseCoordinates = coordinates.slice().reverse();
//         for (let i = 0; i < reverseCoordinates.length; i++) {
//             if(reverseCoordinates[i + 1]){
//                 lines.push(coordinatesToLineString([reverseCoordinates[i], reverseCoordinates[i + 1]]))
//             }
//         }
//         console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', line1,lines)
//     }

    
//     // Check intersection with all lines of the current polygon except the last one
//     for (let i = 0; i < coordinates.length - 2; i++) {
//         console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ::::::::::::::::::::###########  ', coordinates, coordinates[coordinates.length - 1], i, coordinates[i], coordinates[i + 1])
//         const line2 = coordinatesToLineString([coordinates[i], coordinates[i + 1]]);
//         console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line2 ', line2.geometry.coordinates)
//         console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line1 ', line1.geometry.coordinates)
//         for (let j = 0; j < lines.length; j++) {
//             const element = lines[j];
//             const intersection = lineIntersect(line1, element);
//             console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ::::::: ',j, element.geometry.coordinates, intersection)
//             if (intersection.features.length > 0) {
//                 // If the lines intersect, return true
//                 return true;
//             }
            
//         }
//     }

//     // No intersections found, return false
//     return false;
// };