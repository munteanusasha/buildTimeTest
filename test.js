// =======================================================
// =======================================================
// =======================================================


// ==========================================
//                filter
// ==========================================


    // function myFilter(arr){
    //   for (let item of arr) {
    //     if (item.length > 6) {
    //       console.log(item);
    //     }
    //   }
    // }
    // myFilter(filterArr);


    const arr = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    function myFilter(arr, filter){
        let result = [];

        for(let i = 0; i < arr.length; i++){
            if(filter(arr[i])){
                result.push(arr[i]);
            }
        }
        return result;
    }

    const filtredArr = myFilter(arr, (item) => item.length > 6);
    console.log(filtredArr);

// ==========================================
//                map
// ==========================================


    // const map = ['spray', 'limit'];

    // function myMap(arr){
    //   for (let i = 0; i < arr.length; i++) {
    //     const obj = {
    //       id: i,
    //       name: arr[i],
    //     }
    //     console.log(obj);
    //   }
    // }
    // myMap(map);


 const mapArr = ['spray', 'limit'];

    function myMap(arr, map){
        
        const result = [];

      for (let i = 0; i < arr.length; i++) {

            result.push(map(arr[i], i));
            
      }
      return result;
    }

    const mapped = myMap(mapArr, (item, index) => ({id: index, name: item}));
    console.log(mapped);


// ==========================================
//                find
// ==========================================


    const find = [
      {id: 0, name: 'spray'},
      {id: 1, name: 'limit'},
    ];
    const id = 1;

    function myFind(arr){
      for (let item of arr) {
        if (item.id === id) {
          console.log(item);
        }
      }
    }
    myFind(find);


// ==========================================
//                concat
// ==========================================


    const concat1 = ['spray', 'limit', 'elite'];
    const concat2 = ['exuberant', 'destruction', 'present'];

    function myConcat(arr1, arr2){
      const finalConcat = [...arr1, ...arr2];
      console.log(finalConcat);
    }
    myConcat(concat1, concat2);


// ==========================================
//                pipe
// ==========================================

  const pipe = ['spray', 'limit', 'elite', 'exuberant', 'destruction'];

  function myPipe( ...arr){

    const pipeResult = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length > 6) {
        const obj = {
          id: pipeResult.length,
          name: arr[i],
        };
        pipeResult.push(obj);
      }
    }
    console.log(pipeResult);
  }
  myPipe(pipe,[
      myFilter((item) => item.length > 6),
      myMap((item, index) => ({id:index, name: item})),
  ]);

// =======================================================
// =======================================================
// =======================================================

  // function myFilter(arr){
  //   for (let item of arr) {
  //     if (item.length > 6) {
  //       console.log(item);
  //     }
  //   }
  // }
  // function myMap(arr){
  //   for (let i = 0; i < arr.length; i++) {
  //     const obj = {
  //       id: i,
  //       name: arr[i],
  //     }
  //     console.log(obj);
  //   }
  // }
  //
  // function myPipe( ...arr){
  //
  //   const pipeResult = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].length > 6) {
  //       const obj = {
  //         id: pipeResult.length,
  //         name: arr[i],
  //       };
  //       pipeResult.push(obj);
  //     }
  //   }
  //   console.log(pipeResult);
  // }



// =======================================================
// =======================================================
// =======================================================
