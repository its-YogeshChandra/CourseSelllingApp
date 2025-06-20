const value = []

const pathfinder = (data) => {
    data.map((e) => {
      value.push(e.path)
    }
    );
    return value
};

export { pathfinder };
