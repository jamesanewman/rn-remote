import  * as R  from 'ramda';
import { Utils }  from '../Utils';
import fieldMap  from './fields';
import base64 from 'react-native-base64'

class Result {

    constructor(){
        // CREATE THIS.NAME FOR EACH FIELD.
        this._url = undefined;
    }

    get url(){ return this._url}
    set url(url){ this._url = url}
}

export default class Easynews {
    constructor(username, password){
        this._username = username;
        this._password = password;
        this._host = `http://${this._username}:${this._password}@`;

        this.buildFunctions();
    }

    buildFunctions(){
        this.renameFields = Utils.createFieldRenamer(fieldMap);
    }

    addAuthenticationToUrl(url){
        return url.replace('http://',`http://${this._username}:${this._password}@`);
    }

    set username(username){
        this._username = username;
    }
    set password(password){
        this._password = password;
    }
    
    // http://members.easynews.com/2.0/search/solr-search/?fly=2&gps=haven&SelectOther=ARCHIVE&safeO=1&sb=1&pno=1&chxu=1&pby=50&u=1&chxgx=1&st=basic&s1=dtime&s1d=-&sS=3&vv=1&fty[]=VIDEO
    // http://members.easynews.com/2.0/index/advanced?st=adv&safeO=1&sb=1&gps=keywords&sbj=subject&from=&ns=&fil=&fex=&vc=&ac=&s1=nsubject&s1d=%2B&s2=nrfile&s2d=%2B&s3=dsize&s3d=%2B&u=1&sc=1&pby=200&pno=1&sS=0&d1=&d1t=&d2=&d2t=&b1=&b1t=4&b2=&b2t=6&px1=&px1t=&px2=&px2t=&fps1=&fps1t=&fps2=&fps2t=&bps1=&bps1t=&bps2=&bps2t=&hz1=&hz1t=&hz2=&hz2t=&rn1=&rn1t=&rn2=&rn2t=&go=Search

    // GPS = keywords
    // sbj = subject

    buildSearchURL({ keywords = '', subject = '', maxResults = 500, minSize = '', maxSize = '', removeDuplicates = 1, types = ['VIDEO'], collapseSets = 1 }){
        let url = `http://members.easynews.com/2.0/search/solr-search/?`;
        // Search type? Advanced/basic
        url += 'st=adv';

        url += `&gps=${keywords}`;
        url += `&sbj=${subject}`;
        // results per page
        url += `&pby=${maxResults}`;
        url += `&u=${removeDuplicates}`;
        url += `&b1=${minSize}`;
        url += `&b2=${maxSize}`;
        url += `&sc=${collapseSets}`;
        url += types.map(type => `&fty[]=${type}`);

        return url; 
    }
 
    search(searchText){
        const url = this.buildSearchURL(searchText);
        var headers = new Headers();
        headers.append("Authorization", "Basic " + base64.encode(`${this._username}:${this._password}`));

        return fetch(url, {headers})
            .then(res => res.json())
            .then(results => this.createResults(results))

    }

    createResults(results){
        let metadata = R.omit(['data'], results);
        let records = R.map(this.renameFields.bind(this), results.data);
        let parsedResults = R.map(record => { record.metadata = metadata; return record}, records);

        return R.map(this.buildResultInstance.bind(this), parsedResults);
    }

    buildResultInstance(record){
        //console.log(record)
        let result = R.pick(['description', 'duration', 'size'], record);
        result.url = this.buildDownloadUrl(record);
        result.thumbUrl = this.buildThumbUrl(record);
        result.description = record.description;
        return result;
    }

    buildDownloadUrl(record){
        let metadata = record.metadata;
        let url = [metadata.downURL, metadata.dlFarm, metadata.dlPort, record.hash + record.extension, record.filename + record.extension].join('/');
        return this.addAuthenticationToUrl(url);
    }

    buildThumbUrl(record){
        let metadata = record.metadata;
        let url = [metadata.thumbURL + record.hash.slice(0,3), 'pr-' + record.hash + '.jpg'].join('/');
        return this.addAuthenticationToUrl(url);
    }
}

