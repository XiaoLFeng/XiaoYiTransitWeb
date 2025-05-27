import { useState } from 'react';
import type { GetVehicleInsuranceListQueryDTO } from '../../../models/dto/vehicle_dto';
import type { SimpleVehicleItemEntity } from '../../../models/entity/vehicle_entity';

interface VehicleInsuranceSearchFormProps {
    onSearch: (params: GetVehicleInsuranceListQueryDTO) => void;
    onReset: () => void;
    initialParams?: GetVehicleInsuranceListQueryDTO;
    vehicles: SimpleVehicleItemEntity[];
}

/**
 * # 车辆保险搜索表单组件
 */
export function VehicleInsuranceSearchForm({ onSearch, onReset, initialParams = {}, vehicles }: VehicleInsuranceSearchFormProps) {
    const [searchParams, setSearchParams] = useState<GetVehicleInsuranceListQueryDTO>(initialParams);

    /**
     * 处理搜索参数变化
     */
    const handleParamChange = (field: keyof GetVehicleInsuranceListQueryDTO, value: string | undefined) => {
        setSearchParams(prev => ({
            ...prev,
            [field]: value
        }));
    };

    /**
     * 执行搜索
     */
    const handleSearch = () => {
        onSearch(searchParams);
    };

    /**
     * 重置搜索
     */
    const handleReset = () => {
        setSearchParams({});
        onReset();
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">车辆</span>
                        </label>
                        <select 
                            className="select select-bordered"
                            value={searchParams.vehicle_uuid || ''}
                            onChange={(e) => handleParamChange('vehicle_uuid', e.target.value || undefined)}
                        >
                            <option value="">全部车辆</option>
                            {vehicles.map(vehicle => (
                                <option key={vehicle.vehicle_uuid} value={vehicle.vehicle_uuid}>
                                    {vehicle.plate_number} - {vehicle.model}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">保险类型</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="输入保险类型" 
                            className="input input-bordered"
                            value={searchParams.insurance_type || ''}
                            onChange={(e) => handleParamChange('insurance_type', e.target.value || undefined)}
                        />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">保险公司</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="输入保险公司" 
                            className="input input-bordered"
                            value={searchParams.insurance_company || ''}
                            onChange={(e) => handleParamChange('insurance_company', e.target.value || undefined)}
                        />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">操作</span>
                        </label>
                        <div className="flex space-x-2">
                            <button 
                                className="btn btn-primary flex-1"
                                onClick={handleSearch}
                            >
                                搜索
                            </button>
                            <button 
                                className="btn btn-ghost flex-1"
                                onClick={handleReset}
                            >
                                重置
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 