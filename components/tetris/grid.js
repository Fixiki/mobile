import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableOpacity
} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

import Cell from './cell';
import Preview from './preview';
import { belongs, createRandomBlock } from './helpers';
import { rotate } from './rotation';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: props.w,
      h: props.h,
      grid: [],
      blocks: this.generateBlocks(),
      numBlocks: 5,
      score: 0,
      started: false,
      gameOver: true
    }

    this.grid = [];
    this.currentBlock = 'J';
    this.rotation = 0;
    this.speed = 450;
    this.changeColor = this.changeColor.bind(this);
    this.checkColor = this.checkColor.bind(this);

  }

  componentDidMount() {
    this.createGrid();
    this.generateBlocks();
  }

  createGrid() {
    const { w, h } = this.state;
    let grid = [];
    let row = [];

    for (let i = 1; i <= h; i++) { //h is 20, so i want 20 rows
      for (j = 1; j <= w; j++) { // w is 10
        let cell = 0;
        row.push(cell);
      }
      grid.push(row);
      row = [];
    }
    this.grid = grid;
    this.setState({ grid }, () => {
    });
  }

  startGame() {
    this.setState({ gameOver: false, started: true, score: 0 });
    this.loadNextBlock();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.tick()
    }, this.speed)
  }

  tryAgain() {
    this.setState({ gameOver: false, score: 0 }, () => {
      this.refresh();
      this.startGame()
    });
  }

  refresh() {
    for (let i = 4; i < 24; i++) {
      for (j = 0; j < 10; j++) {
        this.changeColor(i, j, 'white');
      }
    }
  }

  checkColor(i, j) {
    let id = `${i},${j}`;
    if (this.refs[id] == null) {
      return null
    }
    return this.refs[id].state.color;
  }

  changeColor(i, j, color) {
    let id = i + ',' + j;
    let bin = color == 'white' ? 0 : 1;
    this.grid[i][j] = bin;
    this.refs[id].changeColor(color);
  }

  down() {
    clearInterval(this.interval);
    this.speed = 1;
    this.interval = setInterval(() => {
      this.tick()
    }, this.speed)
  }

  rotate() {

    if (this.grid[3].includes(1)) {
      return
    }

    this.rotation += 1;
    let color;
    let points = [];
    let previous = [];
    for (let i = 4; i < 24; i++) { //h is 20, so i want 20 rows
      for (j = 0; j < 10; j++) { // w is 10
        if (belongs(this.checkColor(i, j))) {
          color = this.checkColor(i, j);
          this.changeColor(i, j, 'white');
          points.push([i, j]);
          previous.push([i, j]);
        }
      }
    }

    let rotated = rotate(this.currentBlock, points, this.rotation);
    if (this.canRotate(rotated)) {
      // console.log('valid rotation');
      rotated.map((point) => {
        this.changeColor(point[0], point[1], color);
      });
    } else {
      // console.log('invalid rotation');
      previous.map((point) => {
        this.changeColor(point[0], point[1], color);
      });
    }

  }

  canRotate(p) {
    let points = p;
    let canRotate = true;
    // console.log(points);
    points.map((point) => {
      if (point[0] == null || point[1] == null) {
        canRotate = false;
      } else {
        if (this.checkColor(point[0], point[1]) == null) {
          canRotate = false;
        }
        if (this.checkColor(point[0], point[1]) == 'gray') {
          canRotate = false;
        }
      }

    });
    return canRotate;
  }

  canShift(points, direction) {
    let can = true;
    let shift = direction == 'left' ? -1 : 1;
    points.map((point) => {
      if (this.checkColor(point.i, point.j + shift) == null) {
        can = false;
      }

      if (this.checkColor(point.i, point.j + shift) == 'gray') {
        can = false;
      }
    });
    return can;
  }

  shift(points, direction) {
    let shift = direction == 'left' ? -1 : 1;
    if (direction == 'right') {
      points = points.reverse();
    }
    points.map((point) => {
      this.changeColor(point.i, point.j + shift, this.checkColor(point.i, point.j));
      this.changeColor(point.i, point.j, 'white');
    })
  }

  shiftCells(direction) {

    let points = [];
    for (let i = 4; i < 24; i++) { //h is 20, so i want 20 rows
      for (let j = 0; j < 10; j++) { // w is 10
        if (belongs(this.checkColor(i, j))) {
          if (i == 4) {
            return
          }
          points.push({ i, j });
        }
      }
    }

    if (this.canShift(points, direction)) {
      this.shift(points, direction);
    }


  }

  loadNextBlock() {
    this.speed = 450;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.tick()
    }, this.speed);


    let { blocks } = this.state;
    let next = blocks.splice(0, 1)[0];
    this.currentBlock = next.type;
    this.rotation = 0;
    // console.log(next);
    if (next.type == 'I') {
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
      this.changeColor(3, 6, next.color);
    }
    else if (next.type == 'O') {
      this.changeColor(2, 4, next.color);
      this.changeColor(2, 5, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    }
    else if (next.type == 'T') {
      this.changeColor(2, 4, next.color);
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    }
    else if (next.type == 'S') {
      this.changeColor(2, 4, next.color);
      this.changeColor(2, 5, next.color);
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
    }
    else if (next.type == 'Z') {
      this.changeColor(2, 3, next.color);
      this.changeColor(2, 4, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    }
    else if (next.type == 'J') {
      this.changeColor(2, 3, next.color);
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    }
    else if (next.type == 'L') {
      this.changeColor(2, 5, next.color);
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    }
    blocks.push({ id: next.id + 5, ...createRandomBlock() });
    this.setState({ blocks });

  }

  generateBlocks() {
    let blocks = [];
    for (let i = 0; i < 5; i++) {
      blocks.push({ id: i, ...createRandomBlock() });
    }
    return blocks;
  }

  toString() {
    for (let i = 0; i < 24; i++) {
      console.log(this.grid[i])
    }


  }

  clearRow(row) {
    console.log('clearing row', row);

    for (let i = row; i >= 4; i--) {
      for (let k = 0; k < 10; k++) {
        const nextColor = this.checkColor(i - 1, k);
        console.log('change color',i,k,this.checkColor(i, k),nextColor);
        if (nextColor) {
          this.changeColor(i, k, this.checkColor(i - 1, k));
        }
      }
    }


  }

  checkRowsToClear() {
    clearInterval(this.interval);
    let row_was_cleared = false;
    let num_rows_cleared = 0;
    let rows_to_clear = [];
    for (let i = 23; i >= 4; i--) {
      if (!this.grid[i].includes(0)) {
        console.log('adding row', i);
        rows_to_clear.push(i);
      }
    }

    rows_to_clear.forEach((r) => {
      this.clearRow(r);
      num_rows_cleared++;
      row_was_cleared = true;
    });

    if (row_was_cleared) {
      this.setState({ score: this.state.score + 1000 * num_rows_cleared**2 });
    }
  }

  canMoveDown(points) {
    let canmove = true;
    points.map(point => {
      if (this.checkColor(point.i + 1, point.j) == null) {
        canmove = false;
      }

      if (this.checkColor(point.i + 1, point.j) == 'gray') {
        canmove = false;
      }

    });
    return canmove;
  }

  moveDown(points) {
    points.map(point => {
      this.changeColor(point.i + 1, point.j, this.checkColor(point.i, point.j));
      this.changeColor(point.i, point.j, 'white');
    })

  }

  tick() {

    let points = [];
    const { grid, w, h } = this.state;
    for (let i = this.props.h + 3; i >= 0; i--) { //h is 20, so i want 20 rows
      for (let j = this.props.w - 1; j >= 0; j--) { // w is 10
        if (belongs(this.checkColor(i, j))) {
          points.push({ i, j });
        }
      }
    }

    let can = this.canMoveDown(points);
    if (can) {
      this.moveDown(points);
    }

    if (!can && this.grid[3].includes(1)) {
      clearInterval(this.interval);
      for (let i = this.props.h + 3; i >= 0; i--) { //h is 20, so i want 20 rows
        for (let j = this.props.w - 1; j >= 0; j--) { // w is 10
          if (belongs(this.checkColor(i, j))) {
            this.changeColor(i, j, 'gray');
          }
        }
      }
      this.setState({ gameOver: true });
      console.log('game over');
      return
    }

    if (!can) {
      for (let i = this.props.h +3; i >= 0; i--) { //h is 20, so i want 20 rows
        for (let j = this.props.w - 1; j >= 0; j--) { // w is 10
          if (belongs(this.checkColor(i, j))) {
            this.changeColor(i, j, 'gray');
          }
        }
      }
      //cant move down

      this.can = true;
      this.checkRowsToClear();
      this.loadNextBlock();
    }

  }

  renderCells() {
    let size = 18;

    // console.log('rendering grid');
    return this.state.grid.map((row, i) => {
      if (i < 4) {
        return (
          <View key={i} style={{ height: 0, flexDirection: 'row' }}>
            {row.map((cell, j) => {
              let color = 'white';
              return <Cell ref={i + ',' + j} color={color} size={size} />
            })}
          </View>
        )
      }

      return (
        <View key={i} style={{ flexDirection: 'row' }}>
          {row.map((cell, j) => {
            // console.log('color is:', cell)
            let color = 'white';
            if (cell == 1) {
              color = 'blue';
            } else if (cell == 2) {
              color = 'green';
            }

            if (i < 4) {
              color = 'red';
            }

            return <Cell ref={i + ',' + j} borderWidth={1} color={color} size={size} />
          })}
        </View>
      )
    })
  }


  renderButtons() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => this.shiftCells('left')}>
          <Image style={styles.img} source={require('../../assets/images/tetris/left-filled.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.shiftCells('right')}>
          <Image style={styles.img} source={require('../../assets/images/tetris/right-filled.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.down()}>
          <Image style={styles.img} source={require('../../assets/images/tetris/down_arrow.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.rotate()}>
          <Image style={styles.img} source={require('../../assets/images/tetris/rotate_arrow.png')} />
        </TouchableOpacity>
      </View>
    )

  }

  renderStart() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.gameOver}
        style={{ flex: 1 }}
        onRequestClose={() => {
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.5)' }}>
          <Text style={{ fontSize: 64, fontWeight: '800' }}>
            <Text style={{ color: 'blue' }}>T</Text>
            <Text style={{ color: 'orange' }}>E</Text>
            <Text style={{ color: 'yellow' }}>T</Text>
            <Text style={{ color: 'green' }}>R</Text>
            <Text style={{ color: 'red' }}>I</Text>
            <Text style={{ color: 'cyan' }}>S</Text>
          </Text>

          <TouchableOpacity onPress={() => {
            this.state.started ? this.tryAgain() : this.startGame()
          }}>
            <Text style={{ fontSize: 32, color: 'white', fontWeight: '500' }}>
              {this.state.started ? 'TRY AGAIN' : 'START'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <GestureRecognizer
        onSwipeUp={() => this.rotate()}
        onSwipeDown={() => this.down()}
        onSwipeLeft={() => this.shiftCells('left')}
        onSwipeRight={() => this.shiftCells('right')}
        config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
        style={{ flex: 1, justifyContent: 'space-around' }}
      >
        <View style={{ paddingTop: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 26 }}>EA INSPIRED TETRIS</Text>
          <Text style={{ paddingTop: 10, fontSize: 16 }}>Score: {this.state.score}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white' }}>
            {this.renderCells()}
          </View>
          <View style={{ marginLeft: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>NEXT</Text>
            <Preview blocks={this.state.blocks} />
          </View>
        </View>
        {this.renderButtons()}

        {this.renderStart()}

      </GestureRecognizer>
    )
  }
}

let styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50
  }
})