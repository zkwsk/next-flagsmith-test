const delay = (time: number) => new Promise((resolve, reject) => setTimeout(resolve, time))

export default delay;