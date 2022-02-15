import { usePost } from '@hocgin/ui';

/**
 * API
 */
export default class {

  /**
   * 测试接口
   * @param payload
   */
  static worked(payload: any = {}) {
    return usePost(`/worked`, {
      method: 'POST',
      data: { ...payload },
    });
  }
}
