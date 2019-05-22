import daycareRouteCreator from 'index/modules/Daycare/routes';
import programRouteCreator from 'index/modules/Daycare/routes/programRoute';
import enrollRouteCreator from 'index/modules/Daycare/routes/enrollRoute';

describe('index/modules/Daycare/routes', () => {
  it('daycare route works fine', () => {
    const daycareRoutes = daycareRouteCreator();

    expect(daycareRoutes).toHaveLength(2);
    expect(daycareRoutes[0].path).toEqual('daycare/program/:programId');
    expect(daycareRoutes[1].path).toEqual('daycare/program/enroll/:programId');
  });

  it('program route works fine', () => {
    const programRoutes = programRouteCreator();
    expect(programRoutes.path).toEqual('daycare/program/:programId');
  });

  it('enrollment route works fine', () => {
    const enrollmentRoutes = enrollRouteCreator();
    expect(enrollmentRoutes.path).toEqual('daycare/program/enroll/:programId');
  });
});
