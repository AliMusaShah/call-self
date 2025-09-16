import RiskProgress from './RiskProgress'
import SmileMeter from './SmileMeter'

const RiskFactors = ({ risk }) => {
    // console.log(risk, 'risk in RiskFactors');
    const airQuality = risk?.airQuality || 0;
    const moldRisk = risk?.moldRisk || 0;
    const allergyRisk = risk?.allergyRisk || 0;
    // console.log(allergyRisk?.value, 'airQuality')
    return (
        <div className='flex justify-between flex-col gap-4 h-[90%]'>
            <h1>Other Risk Factors</h1>
            <RiskProgress title="Risk of Molding" progress={moldRisk?.value} />
            <RiskProgress title="Air Quality" progress={airQuality?.value} />
            <RiskProgress title="Allergy Risk" progress={allergyRisk?.value} />
            <SmileMeter />
        </div>
    )
}

export default RiskFactors