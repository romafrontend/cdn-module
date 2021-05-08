const {CDN_SERVERS, CDN_ORG} = require('./environment');
const {select} = require('./cdn-module');

async function main() {
    let content;
    let isContentFetched = false;
    let cdnServersList =  CDN_SERVERS.split(',').map(_s => {
        return {
            cdnName: _s,
            falseCount: 0
        }  
    });

    let i = cdnServersList.length;
    while(i--) {
        const server = await select(cdnServersList[i].cdnName);

        if(server.status === 'HTTP 200') {
            content = await server.serve('/api/fetch-items');
            if(content) {
                isContentFetched = true;
                break;
            }
        } else {
            if(cdnServersList[i].falseCount > 1) {
                cdnServersList.slice(i, 1);
            } else {
                ++cdnServersList[i].falseCount;
            }
        }
    }

    if(!isContentFetched) {
        const server = await select(CDN_ORG);
        content = await server.serve('/api/fetch-items');
    }
}

main();