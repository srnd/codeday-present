import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import superagent from 'superagent';
import gql from 'graphql-tag';
import config from './config';


export default class EventInfoApi {
  static async getEventInfo(eventId) {
    const clearInfo = await this.getClear(eventId);
    const prismicInfo = await this.getPrismic(this.getPrismicSeasonForEvent(clearInfo));

    return { ...clearInfo, ...prismicInfo, id: eventId };
  }

  static async getGlobalSponsors() {
    const spaceId = await config.get('CONTENTFUL_SPACE');
    const spaceToken = await config.get('CONTENTFUL_TOKEN');
    const base = `https://cdn.contentful.com/spaces/${spaceId}/environments/master`;
    const url = `${base}/entries?content_type=globalSponsor&access_token=${spaceToken}`;

    try {
      const data = JSON.parse((await superagent.get(url)).text);
      const linkAsset = (id) => data.includes.Asset.find((a) => a.sys.id === id).fields.file.url;

      return data.items.map((i) => ({
        ...i.fields,
        logo: i.fields.logo && linkAsset(i.fields.logo.sys.id),
        audio: i.fields.audio && linkAsset(i.fields.audio.sys.id),
      }));
    } catch (ex) {
      return [];
    }
  }

  static async getCommunityPartners(event) {
    const url = `https://micro.srnd.org/community-partners?region=${event.webname}`;
    try {
      return JSON.parse((await superagent.get(url)).text);
    } catch (ex) {
      return null;
    }
  }

  static getPrismicSeasonForEvent(event) {
    if (!event.batchDate) return null;

    const date = event.batchDate.split('-');
    const seasons = [
      ...Array(3).fill('winter'),
      ...Array(3).fill('spring'),
      ...Array(2).fill('summer'),
      ...Array(3).fill('fall'),
      'winter',
    ];
    const season = seasons[Number(date[1]) - 1];
    return `${date[0]}-${season}`;
  }

  static async getAllEvents() {
    const url = `https://www.codeday.org/index.json`;
    try {
      return JSON.parse((await superagent.get(url)).text);
    } catch (ex) {
      return [];
    }
  }

  static async getClear(eventId) {
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
      };
    } catch (ex) {
      return {};
    }
  }

  static async getPrismic(season) {
    const client = new ApolloClient({
      link: PrismicLink({
        uri: 'https://srnd-codeday.prismic.io/graphql',
      }),
      cache: new InMemoryCache(),
    });

    try {
      const resp = await client.query({
        query: gql`
          query {
            season(uid: "${season}", lang: "en-us") {
              kickoffvideo
          }
        }`,
      });

      return { kickoffVideo: resp.data.season.kickoffvideo.embed_url };
    } catch (ex) {
      return {};
    }
  }
}
