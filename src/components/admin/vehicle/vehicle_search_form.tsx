import { useState } from 'react';
import { VehicleStatus } from '../../../models/dto/vehicle_dto';
import type { GetVehicleListQueryDTO } from '../../../models/dto/vehicle_dto';

/**
 * # 车辆状态选项
 */
const VEHICLE_STATUS_OPTIONS = [
    { value: VehicleStatus.OPERATING, label: '运营' },
    { value: VehicleStatus.MAINTENANCE, label: '维修' },
    { value: VehicleStatus.OUT_OF_SERVICE, label: '停运' },
    { value: VehicleStatus.SCRAPPED, label: '报废' },
];

interface VehicleSearchFormProps {
    onSearch: (params: GetVehicleListQueryDTO) => void;
    onReset: () => void;
    initialParams?: GetVehicleListQueryDTO;
}

/**
 * # 车辆搜索表单组件
 */
export function VehicleSearchForm({ onSearch, onReset, initialParams = {} }: VehicleSearchFormProps) {
    const [searchParams, setSearchParams] = useState<GetVehicleListQueryDTO>(initialParams);

    /**
     * 处理搜索参数变化
     */
    const handleParamChange = (field: keyof GetVehicleListQueryDTO, value: string | number | undefined) => {
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
                            <span className="label-text">车牌号</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="输入车牌号" 
                            className="input input-bordered"
                            value={searchParams.plate_number || ''}
                            onChange={(e) => handleParamChange('plate_number', e.target.value)}
                        />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">车辆型号</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="输入车辆型号" 
                            className="input input-bordered"
                            value={searchParams.model || ''}
                            onChange={(e) => handleParamChange('model', e.target.value)}
                        />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">状态</span>
                        </label>
                        <select 
                            className="select select-bordered"
                            value={searchParams.status !== undefined ? searchParams.status : ''}
                            onChange={(e) => handleParamChange('status', e.target.value ? Number(e.target.value) : undefined)}
                        >
                            <option value="">全部状态</option>
                            {VEHICLE_STATUS_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
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