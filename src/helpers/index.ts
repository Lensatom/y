export const getHashtags = (post:string) => {
  const words = post.split(" ")
  const hashtags = words.filter((word) => word[0] === "#" && word.length > 0)
  return hashtags
}

export const getDate = (timestamp:any) => {
  const date = new Date(timestamp.toDate());
  const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}

export const getTime = (timestamp:any) => {
  return timestamp.toDate().toLocaleTimeString()
}