let allServers = {
    'domain1.org': {
      status: 'HTTP 400',
      serve(_query) {
          console.log(`server domain1.org is not accessible`);
          return null;
      }
    },
    'domain2.com': {
        status: 'HTTP 200',
        serve(_query) {
            console.log(`data not exist server: domain2.com`);
            return null;
        }
    },
    'domain3.com': {
        status: 'HTTP 200',
        serve(_query) {
            console.log(`fetch ${_query} content from server: domain3.com`);
            return 'my content';
        }
    },
    'orgdomain.com': {
        status: 'HTTP 200',
        falseCount: 0,
        serve(_query) {
            console.log(`fetch ${_query} content from server: orgdomain.com`);
            return 'my content';
        }
    }
}

module.exports = {
    select: async (_serverName) => {
        return new Promise((resolve, reject) => {
            const server = allServers[_serverName];
            if(server) {
              resolve(server);
            } else {
                resolve(null);
            }
        }); 
    }
}