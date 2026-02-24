'use client';

import { ScanResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useCallback } from 'react';

interface PDFGeneratorProps {
	result: ScanResult;
}

export function PDFGenerator({ result }: PDFGeneratorProps) {
	const generatePDF = useCallback(async () => {
		try {
			// Dynamic import to avoid SSR issues
			const { jsPDF } = await import('jspdf');

			const doc = new jsPDF();
			const pageWidth = doc.internal.pageSize.getWidth();
			const pageHeight = doc.internal.pageSize.getHeight();
			let yPosition = 20;

			// Background
			doc.setFillColor(255, 255, 255);
			doc.rect(0, 0, pageWidth, pageHeight, 'F');

			// Title
			doc.setFontSize(24);
			doc.setTextColor(10, 102, 194);
			doc.text('AI Visibility Audit Report', pageWidth / 2, yPosition, {
				align: 'center',
			});

			// Company and Date
			yPosition += 15;
			doc.setFontSize(12);
			doc.setTextColor(26, 32, 44);
			doc.text(`Company: ${result.company}`, 20, yPosition);
			yPosition += 8;
			doc.text(`URL: ${result.url}`, 20, yPosition);
			yPosition += 8;
			doc.text(
				`Scanned: ${new Date(result.scanDate).toLocaleString()}`,
				20,
				yPosition,
			);

			// Score Section
			yPosition += 15;
			doc.setFontSize(16);
			doc.setTextColor(10, 102, 194);
			doc.text('Overall Score', 20, yPosition);
			yPosition += 10;
			doc.setFontSize(32);
			doc.setTextColor(10, 102, 194);
			doc.text(`${result.score.overall}/100`, 20, yPosition);

			// Score Breakdown
			yPosition += 20;
			doc.setFontSize(12);
			doc.setTextColor(10, 102, 194);
			doc.text('Score Breakdown', 20, yPosition);
			yPosition += 10;
			doc.setFontSize(10);
			doc.setTextColor(26, 32, 44);

			result.score.breakdown.forEach((item) => {
				doc.text(
					`${item.category}: ${item.score}/100 (${item.weight}% weight)`,
					25,
					yPosition,
				);
				yPosition += 8;
			});

			// Crawler Status
			yPosition += 10;
			doc.setFontSize(12);
			doc.setTextColor(10, 102, 194);
			doc.text('Crawler Status', 20, yPosition);
			yPosition += 10;
			doc.setFontSize(10);
			doc.setTextColor(26, 32, 44);

			result.crawlers.forEach((crawler) => {
				doc.text(
					`${crawler.name}: ${crawler.score}/100 ${crawler.visible ? '(Visible)' : '(Not Optimized)'}`,
					25,
					yPosition,
				);
				yPosition += 8;
			});

			// Recommendations
			if (yPosition > pageHeight - 40) {
				doc.addPage();
				yPosition = 20;
			}

			yPosition += 10;
			doc.setFontSize(12);
			doc.setTextColor(10, 102, 194);
			doc.text('Recommendations', 20, yPosition);
			yPosition += 10;
			doc.setFontSize(10);
			doc.setTextColor(26, 32, 44);

			const recommendations = Array.from(
				new Set(result.crawlers.flatMap((c) => c.recommendations)),
			);

			recommendations.forEach((rec) => {
				const lines = doc.splitTextToSize(rec, pageWidth - 40);
				lines.forEach((line: string) => {
					if (yPosition > pageHeight - 20) {
						doc.addPage();
						yPosition = 20;
					}
					doc.text(line, 25, yPosition);
					yPosition += 6;
				});
				yPosition += 2;
			});

			// Footer
			doc.setFontSize(8);
			doc.setTextColor(101, 103, 107);
			doc.text(
				'AI Search Visibility Scanner - Your AI Readiness Report',
				pageWidth / 2,
				pageHeight - 10,
				{ align: 'center' },
			);

			// Download
			doc.save(
				`AI-Audit-${result.company}-${new Date().toISOString().split('T')[0]}.pdf`,
			);
		} catch (error) {
			console.error('Error generating PDF:', error);
			alert('Failed to generate PDF. Please try again.');
		}
	}, [result]);

	return (
		<Button
			onClick={generatePDF}
			className='bg-accent hover:bg-accent/90 text-white font-semibold flex items-center gap-2'
		>
			<Download className='w-4 h-4' />
			Export PDF Report
		</Button>
	);
}
