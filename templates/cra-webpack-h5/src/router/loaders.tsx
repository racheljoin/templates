import { redirect } from 'react-router-dom';
import { reduxStore } from '@/store/redux';
import { IIndexReportData, getEmoList, getIndexReport, getReport, reportInitData } from '@/service/models/report';
import type { AgnosticIndexRouteObject } from '@remix-run/router';

const isLogin = () => {
  const { token } = reduxStore.getState().login;
  return !!token;
};

export async function AuthLoader() {
  if (isLogin()) {
    return {
      isLogin: true,
    };
  }
  return redirect('/login');
}

export async function getIndexData() {
  const indexData = (await Promise.all([getIndexReport(), getEmoList({ faceCode: '' })])).map((res) => res.data.detail);

  return {
    detail: indexData[0],
    emoList: indexData[1]?.list || [],
  };
}

export interface IReportPageData {
  detail: IIndexReportData;
  emoList: { createTime: string; emotion: string; num: number }[];
}
export const getReportData: AgnosticIndexRouteObject['loader'] = async ({ params }) => {
  const faceCode = params.id ?? '';

  const reportData = (
    await Promise.all([
      getReport({
        faceCode,
      }),
      getEmoList({ faceCode }),
    ])
  ).map((res) => res.data.detail);
  return {
    detail: reportData[0] || reportInitData,
    emoList: reportData[1]?.list || [],
  };
};

export async function getReportDataLoader() {}
