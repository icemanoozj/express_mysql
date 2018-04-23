async function ff() {
    console.log("ff");
    return 1;
}

console.log("main");

ff().then(rs => {
    console.log(rs);
});