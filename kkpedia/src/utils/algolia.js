import algoliasearch from "algoliasearch";

const client = algoliasearch("8IUSLSKCEF", "265d7f334c4d5811b6e2b01e5b3211cb");

const algolia = client.initIndex("kkpedia");

export default algolia;
