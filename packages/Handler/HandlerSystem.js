function System() {
    this.geoms = [];
    this.constraints = {};
}

System.prototype.create = function () {
    const name = 'SPBGASU_JS.2018071020181010.[cnv][mdl][slv][vsn]';
    const key = 'SHgnhlm86MtWL4XrNx/JOp1uZLrHKeRr6akglloUYfpYe1Kv8M3u+cakzqKnxzBL/laY9cj8mizz++AdnWi1pA==';
    window.c3d_solver_enabler.prototype.GCE_EnableSolverModule(name, name.length, key, key.length);

    this.c3d_solver_api = new window.gce_api();
    this.c3d_solver = this.c3d_solver_api.GCE_CreateSystem();
}

const RemoveSystem = function (system) {
    system.c3d_solver_api.GCE_RemoveSystem(system.c3d_solver);
    system.geoms = {};
    console.warn('System removed!');
}

System.prototype.clear = function () {
    this.c3d_solver_api.GCE_ClearSystem(this.c3d_solver);
    this.geoms = {};
    this.c3d_solver_api = {};
    console.warn('System cleared!');
}

System.prototype.testFunc = function () {
    console.log('1111', this.test);
    this.test += ' или нет?';
}

export {
    System,
    RemoveSystem,
};
