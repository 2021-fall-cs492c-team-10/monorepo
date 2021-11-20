export default function generateClassroomHash() {
  const generateSyllable = () => {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const first = ['B', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'S', 'T', 'W'];
    const second = ['A', 'E', 'I', 'O', 'U'];
    const third = ['K', 'L', 'M', 'N', 'P', 'S', 'T', 'Z'];

    return `${random(first)}${random(second)}${random(third)}`;
  };
  return `${generateSyllable()}-${generateSyllable()}-${generateSyllable()}`;
}
