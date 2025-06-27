

const pathfinder = (data) => {
  const value = [];
    data.map((e) => {
      value.push(e.path)
    }
    );
    return value
};

export { pathfinder };
