import moment from 'moment'





export const thousands_separators = (num) => {
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}


export const shrinkNumber = (num) => {
   if(num > 999999) {
      return `${(num / 1000000).toFixed(1)}M`
   }else if(num > 999) {
     return `${(num / 1000).toFixed(1)}K`
   }else {
     return num
   }
}


export const getIndexOfK = (arr, k) => {
    for (let i = 0; i < arr.length; i++) {
      let index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
    }
  }





  export const timeAgo = time => {

    const diff = new Date().getTime() - time

    if(diff >= 86400000) {
      return moment(time).format('ll')
    }else if(diff >= 3600000) {
      const divide = Math.round(diff/3600000)
      return `${divide} ${divide === 1 ? 'hour' : 'hours'} ago`
    }else if(diff >= 60000) {
      const divide = Math.round(diff/60000)
      return `${divide} ${divide === 1 ? 'minute' : 'minutes'} ago`
    }else {
      return 'a few seconds ago'
    }

}






// import {Adsense} from '@ctrl/react-adsense';

// // ads with no set-up
// <Adsense
//   client="ca-pub-7640562161899788"
//   slot="7259870550"
// />

// // ads with custom format
// <Adsense
//   client="ca-pub-7640562161899788"
//   slot="7259870550"
//   style={{ width: 500, height: 300 }}
//   format=""
// />

// // responsive and native ads
// <Adsense
//   client="ca-pub-7640562161899788"
//   slot="7259870550"
//   style={{ display: 'block' }}
//   layout="in-article"
//   format="fluid"
// />