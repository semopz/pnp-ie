export const start = async ctx => {
  const polyfills = await import(
    /* webpackChunkName: 'polyfills' */
    './polyfills'
  );
  await polyfills.load();

  const [common, pnp, pnpGraph] = await Promise.all([
    import(
      /* webpackChunkName: 'pnp-common' */
      '@pnp/common'
    ),
    import(
      /* webpackChunkName: 'pnp-sp' */
      '@pnp/sp'
    ),
    import(
      /* webpackChunkName: 'pnp-graph' */
      '@pnp/graph'
    ),
    import(
      /* webpackChunkName: 'pnp-graph-users' */
      '@pnp/graph/users'
    ),
    import(
      /* webpackChunkName: 'pnp-sp-webs' */
      '@pnp/sp/webs'
    ),
    import(
      /* webpackChunkName: 'pnp-sp-lists-web' */
      '@pnp/sp/lists/web'
    )
  ]);

  common.setup({
    spfxContext: ctx,
    ie11: true,
  });

  pnp.sp.setup({ sp: {
    baseUrl: ctx.pageContext.web.absoluteUrl //In real life, I use this for getting data from remote sites
  }});

  try {
    console.log('lists: ', await pnp.sp.web.lists());
    console.log('current user: ', await pnpGraph.graph.me());
  } catch (err) {
    console.error (err);
    console.log('pnp object: ', pnp);
  }
};