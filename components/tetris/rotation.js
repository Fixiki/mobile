export function rotate(type, p, rotation) {
  let points = p;


  if (type == 'T') {
    rotation = rotation % 4;
    if (rotation == 1) {
      let temp = points[1];
      temp[0] += 1;
      temp[1] += 1;
      points.splice(1, 1, temp);
    } else if (rotation == 2) {
      let temp = points[0];
      temp[0] += 1;
      temp[1] -= 1;
      points.splice(0, 1, temp);
    } else if (rotation == 3) {
      let temp = points[2];
      temp[0] -= 1;
      temp[1] -= 1;
      points.splice(2, 1, temp);
    } else {
      let temp = points[3];
      temp[0] -= 1;
      temp[1] += 1;
      points.splice(3, 1, temp);
    }
  } else if (type == 'I') {
    rotation = rotation % 2;
    console.log('rotating I');
    // console.log(points);
    if (rotation == 1) {
      points[0][0] -= 1;
      points[0][1] += 2;
      points[1][0] = points[1][0];
      points[1][1] += 1;
      points[2][0] += 1;
      points[2][1] = points[2][1];
      points[3][0] += 2;
      points[3][1] -= 1;
    } else {
      points[0][0] += 1;
      points[0][1] -= 2;
      points[1][0] = points[1][0];
      points[1][1] -= 1;
      points[2][0] -= 1;
      points[2][1] = points[2][1];
      points[3][0] -= 2;
      points[3][1] += 1;
    }
  } else if (type == 'O') {
    //nothing
  } else if (type == 'S') {
    rotation = rotation % 2;
    if (rotation == 1) {
      let first = points[0];
      let second = points[1];
      first[1] -= 1;
      second[0] += 2;
      second[1] -= 1;
      points.splice(0, 1, first);
      points.splice(1, 1, second);
    } else {
      let first = points[0];
      let second = points[3];
      first[1] += 1;
      second[0] -= 2;
      second[1] += 1;
      points.splice(0, 1, first);
      points.splice(3, 1, second);
    }
  } else if (type == 'Z') {
    rotation = rotation % 2;
    if (rotation == 1) {
      let first = points[0];
      let second = points[1];
      first[1] += 2;
      second[0] += 2;
      points.splice(0, 1, first);
      points.splice(1, 1, second);
    } else {
      let first = points[0];
      let second = points[3];
      first[1] -= 2;
      second[0] -= 2;
      points.splice(0, 1, first);
      points.splice(3, 1, second);
    }
  } else if (type == 'J') {
    rotation = rotation % 4;
    if (rotation == 1) {
      points[0][1] += 2;

      points[1][0] -= 1;
      points[1][1] += 1;

      points[3][0] += 1;
      points[3][1] -= 1;
    } else if (rotation == 2) {
      points[2][0] -= 1;
      points[2][1] -= 1;

      points[3][0] -= 1;
      points[3][1] += 1;
    } else if (rotation == 3) {
      points[0][1] += 1;

      points[1][0] += 1;

      points[2][0] += 2;
      points[2][1] -= 1;

      points[3][0] += 1;
      points[3][1] -= 2;
    } else {
      points[0][0] += 1;
      points[0][1] += 1;

      points[2][0] -= 2;

      points[3][0] -= 1;
      points[3][1] -= 1;
    }


  } else if (type == 'L') {
    rotation = rotation % 4;
    if (rotation == 1) {
      points[0][0] += 2;

      points[1][0] -= 1;
      points[1][1] += 1;

      points[3][0] += 1;
      points[3][1] -= 1;
    } else if (rotation == 2) {
      points[0][1] += 2;

      points[1][0] -= 1;
      points[1][1] += 1;

      points[2][0] -= 2;

      points[3][0] -= 1;
      points[3][1] -= 1;
    } else if (rotation == 3) {
      points[0][1] += 1;

      points[1][0] += 1;

      points[2][0] += 2;
      points[2][1] -= 1;

      points[3][0] -= 1;
    } else {
      points[0][1] += 1;

      points[1][0] += 1;

      points[2][1] -= 1;

      points[3][0] -= 1;
      points[3][1] -= 2;
    }

  }

  return points;
}