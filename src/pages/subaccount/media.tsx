import { get_subaccount } from '@/api/subaccount/route';
import MediaComponent from '@/component/mediaComponent';
import BlurPage from '@/global/blur-page';
import { Media, SubAccountType } from '@/types/types';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

type Props = {}

export default function MediaSubAccount({}: Props) {
  const params = useParams();

  const subAccountId = params.Id;

  const {data: subAccount, isError} = useQuery<SubAccountType>('getOneSubAccount', () => get_subaccount(subAccountId as string), {
    retry: false
  });

  if (isError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  if (!subAccount) {
    return null;
  }

  const media: Media[] = subAccount.media;

  return (
    <BlurPage>
      <MediaComponent data={media} subAccountId={subAccountId as string}/>
    </BlurPage>
  )
}