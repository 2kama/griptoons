
export const createCookie = (name, value, days) => {
  
    let expires = ""
  
      if (days) {
          let date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          expires = "; expires="+date.toGMTString();
      }
      else expires = "";
  
    document.cookie = `${name}=${escape(value)}${expires}; path=/; SameSite=Lax`
  
  }
  
  
  export const readCookie = name => {
  
      let nameEQ = `${name}=`;
      let ca = document.cookie.split(';');
  
      for(let i=0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0)===' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
      }
  
      return null;
  
  }
  
  
  
  export const eraseCookie = name => {
  
      createCookie(name, "", -1);
  
  }