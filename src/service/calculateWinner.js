const SIZE = 15;
// let test = Array(25).fill(null);
// test[4] = test[8] = test[12] = test[16] = test[20] = 'X';

export const calculateWinner = (squares, i) => {
    if(squares[i] === null) return null;

    const length = SIZE*SIZE;
    let j, count, line, block;

    //check column
    count = 1;
    j = i - SIZE;
    line = [i];
    block = 0;
    while (j >= 0 && j < length) {
        if (squares[j] === squares[i]) {
            count++;
            line.push(j)
            j -= SIZE;
        } else {
            if(squares[j]) block++;
            break;
        }

    }
    j = i + SIZE;
    while (j >= 0 && j < length) {
        if (squares[j] === squares[i]){
            count++;
            line.push(j)
            j += SIZE;
        } else {
            if(squares[j]) block++;
            break;
        }

    }
    if(count >= 5 && block !== 2)
        return {
            winner: squares[i],
            line
        }
    //check row
    count = 1;
    j = i - 1;
    line = [i];
    block = 0;
    while (j >= 0 && j < length) {
        if (squares[j] === squares[i]) {
            count++;
            line.push(j);
            j--;
        }  else {
            if(squares[j]) block++;
            break;
        }

    }
    j = i + 1;
    while (j >= 0 && j < length) {
        if (squares[j] === squares[i]){
            count++;
            line.push(j);
            j++;
        }   else {
            if(squares[j]) block++;
            break;
        }

    }
    if(count >= 5 && block !== 2)
        return {
            winner: squares[i],
            line
        }

    //check major Diagonal
    count = 1;
    j = i - SIZE - 1;
    line = [i];
    block = 0;
    while (j >= 0 && j < length) {
        if (squares[j] === squares[i]) {
            count++;
            line.push(j);
            j = j - SIZE - 1;
        }  else {
            if(squares[j]) block++;
            break;
        }

    }
    j = i + SIZE + 1;
    while (j >= 0 && j < length) {
        if (squares[j] === squares[i]){
            count++;
            line.push(j);
            j = j + SIZE + 1;
        }   else {
            if(squares[j]) block++;
            break;
        }

    }
    if(count >= 5 && block !== 2)
        return {
            winner: squares[i],
            line
        }
    // checkSubDiagonal
    count = 1;
    j = i - SIZE + 1;
    line = [i];
    block = 0;
    while (j >= 0 && j < length) {
        if (squares[j] === squares[i]) {
            count++;
            line.push(j);
            j = j - SIZE + 1;
        } else {
            if(squares[j]) block++;
            break;
        }

    }
    j = i + SIZE - 1;
    while (j >= 0 && j < length) {
        if (squares[j] === squares[i]){
            count++;
            line.push(j);
            j = j + SIZE - 1;
        } else {
            if(squares[j]) block++;
            break;
        }
    }
    if(count >= 5 && block !== 2)
        return {
            winner: squares[i],
            line
        }
    //draw
    if (!squares.includes(null)) {
        return {
            winner: null,
            draw: true
        }
    }
    //nothing happen
    return {
        winner: null
    };
}
// console.log(test)
// // console.log(test[18])
// console.log(calculateWinner(test,8))
