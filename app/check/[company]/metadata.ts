import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company } = await params;
  const decodedCompany = decodeURIComponent(company);

  return {
    title: `Is ${decodedCompany} Visible to AI? | Free Audit Report`,
    description: `Get your AI visibility score for ${decodedCompany}. See how visible your website is to ChatGPT-5, Gemini, and Claude. Free instant scan.`,
    openGraph: {
      title: `AI Visibility Report: ${decodedCompany}`,
      description: `Is ${decodedCompany} visible to AI crawlers? Run a free audit and get your score.`,
      type: 'website',
      url: `https://aisearchscanner.com/check/${company}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Is ${decodedCompany} Visible to AI?`,
      description: `Get your AI visibility score for ${decodedCompany}. See how visible your website is to AI models.`,
    },
  };
}
