import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import superagent from 'superagent';
import config from './config';
import gql from "graphql-tag";


export default class EventInfoApi {
  static async getEventInfo(eventId) {
    const clearInfo = await this._getClear(eventId);
    const prismicInfo = await this._getPrismic(this._getPrismicSeasonForEvent(clearInfo));

    return {...clearInfo, ...prismicInfo, id: eventId};
  }

  static async getGlobalSponsors()
  {
    const spaceId = await config.get('CONTENTFUL_SPACE');
    const spaceToken = await config.get('CONTENTFUL_TOKEN');
    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=globalSponsor&access_token=${spaceToken}`;

    try {
      const data = JSON.parse((await superagent.get(url)).text);
      return data.items.map(i => ({
        ...i.fields,
        logo: data.includes.Asset.find((j) => j.sys.id === i.fields.logo.sys.id).fields.file.url
      }));
    } catch (ex) {
      return [];
    }
  }

  static _getPrismicSeasonForEvent(event) {
    if (!event.batchDate) return null;

    const date = event.batchDate.split('-');
    const seasons = ['winter', 'winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'fall', 'fall', 'fall', 'winter'];
    const season = seasons[Number(date[1]) - 1];
    return `${date[0]}-${season}`;
  }

  static async _getClear(eventId) {
    const clearPub = await config.get('CLEAR_PUBLIC');
    const clearPriv = await config.get('CLEAR_PRIVATE');

    const url = `https://clear.codeday.org/api/event/${eventId}?public=${clearPub}&private=${clearPriv}`;
    try {
      const data = JSON.parse((await superagent.get(url)).text);
      return {
        name: data.name,
        webname: data.webname,
        regionName: data.region_name,
        batchName: data.batch.name,
        batchDate: data.batch.starts_at,
        venueName: data.venue.name,
        startsAt: data.starts_at,
        endsAt: data.ends_at,
        tz: data.timezone,
        schedule: data.schedule,
        sponsors: data.sponsors,
      }
    } catch (ex) {
      return {};
    }
  }

  static async _getPrismic(season) {
    const client = new ApolloClient({
      link: PrismicLink({
        uri: "https://srnd-codeday.prismic.io/graphql",
      }),
      cache: new InMemoryCache()
    });
  
    try {
      const resp = await client.query({query: gql`
        query {
          season(uid: "${season}", lang: "en-us") {
            kickoffvideo
          }
        }`});

      return {kickoffVideo: resp.data.season.kickoffvideo.embed_url};
    } catch (ex) {
      return {};
    }
  }
}